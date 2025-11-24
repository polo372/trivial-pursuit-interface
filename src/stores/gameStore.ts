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

        getQuestionByCategory: (category: string) => {
            update(state => {
                const index = state.questions.findIndex(q => q.category === category);

                if (index === -1) {
                    // No more questions, reload this category
                    const allQuestions = questionsFromFile as Question[]; // Should ideally be the source of truth
                    const categoryQuestions = shuffleArray(allQuestions.filter(q => q.category === category));

                    const newQuestions = [...state.questions, ...categoryQuestions];
                    localStorage.setItem(getQuestionsLocalStorageKey(), JSON.stringify(newQuestions));

                    // Recursive call to get the first one from the reloaded batch
                    // But since we are inside an update, we can't await or recurse easily without side effects
                    // So we just return the first one from the new batch
                    const nextQuestion = categoryQuestions[0] as Question;
                    // Remove it from the pool
                    const remaining = newQuestions.filter(q => q.id !== nextQuestion.id);
                    localStorage.setItem(getQuestionsLocalStorageKey(), JSON.stringify(remaining));

                    return { ...state, questions: remaining, currentQuestion: nextQuestion };
                }

                const question = state.questions[index];
                const newQuestions = [...state.questions];
                newQuestions.splice(index, 1);

                localStorage.setItem(getQuestionsLocalStorageKey(), JSON.stringify(newQuestions));

                return { ...state, questions: newQuestions, currentQuestion: question };
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
