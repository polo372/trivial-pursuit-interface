import { writable, derived } from 'svelte/store';
import questionsFromFile from '../assets/questions.json';

// Types
export type Question = {
    question: string;
    answer: string;
    category: string;
    id: number;
};

const QUESTIONS_LOCAL_STORAGE_KEY = "questions_trivial_pursuit";

// Helper to get slug (kept from original logic)
const getSlugFromUrl = (): string => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("file") || "";
};

const getQuestionsLocalStorageKey = (): string => {
    const slug = getSlugFromUrl();
    return slug === "" ? QUESTIONS_LOCAL_STORAGE_KEY : QUESTIONS_LOCAL_STORAGE_KEY + "_" + slug;
};

// Store state
interface GameState {
    questions: Question[];
    currentQuestion: Question | null;
    loading: boolean;
    error: string | null;
}

const initialState: GameState = {
    questions: [],
    currentQuestion: null,
    loading: false,
    error: null
};

function createGameStore() {
    const { subscribe, set, update } = writable<GameState>(initialState);

    return {
        subscribe,

        init: async () => {
            update(s => ({ ...s, loading: true }));
            try {
                // Try to load from localStorage first
                const key = getQuestionsLocalStorageKey();
                const stored = localStorage.getItem(key);

                let questions: Question[] = [];

                if (stored) {
                    questions = JSON.parse(stored);
                } else {
                    // Load from file
                    const slug = getSlugFromUrl();
                    if (slug === "") {
                        questions = questionsFromFile as Question[];
                    } else {
                        const module = await import(`../assets/questions-${slug}.json`);
                        questions = module.default;
                    }

                    // Shuffle and save
                    questions = shuffleArray(questions);
                    localStorage.setItem(key, JSON.stringify(questions));
                }

                update(s => ({ ...s, questions, loading: false }));
            } catch (e) {
                console.error(e);
                update(s => ({ ...s, error: "Erreur de chargement", loading: false }));
            }
        },

        resetGame: async () => {
            const key = getQuestionsLocalStorageKey();
            localStorage.removeItem(key);
            // Re-init will reload from file
            await gameStore.init();
        },

        clearCurrentQuestion: () => {
            update(s => ({ ...s, currentQuestion: null }));
        },

        getQuestionByCategory: (category: string) => {
            update(state => {
                let nextQuestion: Question | undefined;
                let newQuestions: Question[] = [...state.questions];

                // 1. Try to find a question of this category in the current pool
                const index = newQuestions.findIndex(q => q.category === category);

                if (index !== -1) {
                    // Found one in current pool
                    nextQuestion = newQuestions[index];
                    // Remove it
                    newQuestions.splice(index, 1);
                } else {
                    // 2. Not found, reload from source
                    const allQuestions = questionsFromFile as Question[];
                    const categoryQuestions = allQuestions.filter(q => q.category === category);

                    if (categoryQuestions.length === 0) {
                        console.error(`No questions found for category: ${category}`);
                        return state;
                    }

                    // Shuffle the reloaded questions
                    const reloaded = shuffleArray(categoryQuestions);

                    // Pick the first one
                    nextQuestion = reloaded[0];

                    // Add the rest of the reloaded questions to our pool (so we don't reload every time)
                    // We keep existing questions from OTHER categories
                    const otherCategories = newQuestions.filter(q => q.category !== category);
                    const remainingReloaded = reloaded.slice(1);

                    newQuestions = [...otherCategories, ...remainingReloaded];
                }

                // Save to local storage
                localStorage.setItem(getQuestionsLocalStorageKey(), JSON.stringify(newQuestions));

                return {
                    ...state,
                    questions: newQuestions,
                    currentQuestion: nextQuestion || null
                };
            });
        }
    };
}

// Helper for shuffling
function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export const gameStore = createGameStore();

// Derived store for categories
export const categories = derived(gameStore, $gameStore => {
    // We should get categories from the full list, not just remaining questions
    // So we use questionsFromFile as the source of truth for available categories
    return (questionsFromFile as Question[])
        .map(q => q.category)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
});
