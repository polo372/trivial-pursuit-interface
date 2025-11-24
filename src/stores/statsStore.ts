import { writable } from 'svelte/store';

interface CategoryStats {
    answered: number;
    correct: number;
}

interface StatsState {
    totalQuestions: number;
    totalCorrect: number;
    categories: Record<string, CategoryStats>;
    streak: number;
    bestStreak: number;
    achievements: string[];
}

const STATS_STORAGE_KEY = 'trivial_pursuit_stats';

const initialState: StatsState = {
    totalQuestions: 0,
    totalCorrect: 0,
    categories: {},
    streak: 0,
    bestStreak: 0,
    achievements: []
};

function createStatsStore() {
    // Load initial state from localStorage
    const stored = localStorage.getItem(STATS_STORAGE_KEY);
    const startState = stored ? JSON.parse(stored) : initialState;

    const { subscribe, update, set } = writable<StatsState>(startState);

    return {
        subscribe,

        recordAnswer: (category: string, isCorrect: boolean) => {
            update(state => {
                const catStats = state.categories[category] || { answered: 0, correct: 0 };

                const newState = {
                    ...state,
                    totalQuestions: state.totalQuestions + 1,
                    totalCorrect: state.totalCorrect + (isCorrect ? 1 : 0),
                    streak: isCorrect ? state.streak + 1 : 0,
                    bestStreak: isCorrect ? Math.max(state.bestStreak, state.streak + 1) : state.bestStreak,
                    categories: {
                        ...state.categories,
                        [category]: {
                            answered: catStats.answered + 1,
                            correct: catStats.correct + (isCorrect ? 1 : 0)
                        }
                    }
                };

                // Check achievements
                const newAchievements = [...state.achievements];
                if (newState.streak >= 5 && !newAchievements.includes('ON_FIRE')) {
                    newAchievements.push('ON_FIRE');
                }
                if (newState.totalCorrect >= 50 && !newAchievements.includes('VETERAN')) {
                    newAchievements.push('VETERAN');
                }

                newState.achievements = newAchievements;

                localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newState));
                return newState;
            });
        },

        resetStats: () => {
            localStorage.removeItem(STATS_STORAGE_KEY);
            set(initialState);
        }
    };
}

export const statsStore = createStatsStore();
