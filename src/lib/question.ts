import { gameStore } from '../stores/gameStore';
import questionsFromFile from "../assets/questions.json";

// Deprecated: Logic moved to gameStore
// Kept for compatibility if needed, but mostly forwarding or unused

export const initQuestions = async (): Promise<void> => {
  await gameStore.init();
};

export const reloadGame = async (): Promise<void> => {
  await gameStore.resetGame();
};

export const getCategories = async (): Promise<string[]> => {
  // Return unique categories from file
  return questionsFromFile
    .map((q) => q.category)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();
};

// Legacy exports that might not be needed anymore if components use store directly
// But we keep them to avoid breaking imports in other files we haven't touched yet (if any)
export const getQuestionByCategory = (category: string) => {
  // This is now handled by the store subscription in components
  // But we can trigger the fetch here
  gameStore.getQuestionByCategory(category);
  return null; // Components should use $gameStore.currentQuestion
};

export const reloadQuestionsByCategory = (category: string): void => {
  // Handled internally by gameStore when it runs out of questions
  console.log("Reloading questions for category logic is now automatic in gameStore");
};
