import { writable } from 'svelte/store';

export interface Player {
    id: string;
    name: string;
    color: string;
    avatar: string;
    score: number;
    categoriesWon: string[]; // Categories where they answered correctly at least once (simplified rule)
}

interface MultiplayerState {
    players: Player[];
    currentPlayerIndex: number;
    gameStatus: 'setup' | 'playing' | 'finished';
    winner: Player | null;
    turnCount: number;
}

const initialState: MultiplayerState = {
    players: [],
    currentPlayerIndex: 0,
    gameStatus: 'setup',
    winner: null,
    turnCount: 0
};

function createPlayerStore() {
    const { subscribe, set, update } = writable<MultiplayerState>(initialState);

    return {
        subscribe,

        addPlayer: (name: string, color: string, avatar: string) => {
            update(state => ({
                ...state,
                players: [
                    ...state.players,
                    {
                        id: crypto.randomUUID(),
                        name,
                        color,
                        avatar,
                        score: 0,
                        categoriesWon: []
                    }
                ]
            }));
        },

        removePlayer: (id: string) => {
            update(state => ({
                ...state,
                players: state.players.filter(p => p.id !== id)
            }));
        },

        startGame: () => {
            update(state => ({
                ...state,
                gameStatus: 'playing',
                currentPlayerIndex: 0,
                turnCount: 1
            }));
        },

        nextTurn: () => {
            update(state => {
                const nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
                return {
                    ...state,
                    currentPlayerIndex: nextIndex,
                    turnCount: state.turnCount + 1
                };
            });
        },

        recordScore: (playerId: string, category: string, points: number = 1) => {
            update(state => {
                const players = state.players.map(p => {
                    if (p.id === playerId) {
                        const categoriesWon = p.categoriesWon.includes(category)
                            ? p.categoriesWon
                            : [...p.categoriesWon, category];

                        return {
                            ...p,
                            score: p.score + points,
                            categoriesWon
                        };
                    }
                    return p;
                });

                // Check for winner (e.g., 6 categories or score limit)
                // For now, let's say 10 points wins or all categories
                const winner = players.find(p => p.score >= 10); // Simple win condition

                return {
                    ...state,
                    players,
                    gameStatus: winner ? 'finished' : state.gameStatus,
                    winner: winner || null
                };
            });
        },

        resetGame: () => {
            set(initialState);
        }
    };
}

export const playerStore = createPlayerStore();
