import questionsFromFile from "../assets/questions.json";

const QUESTIONS_LOCAL_STORAGE_KEY = "questions_trivial_pursuit";

const getSlugFromUrl = (): string => {
  return window.location.pathname.split("/").pop() || "";
};

const getQuestionsLocalStorageKey = (): string => {
  const slug = getSlugFromUrl();
  if (slug === "") {
    return QUESTIONS_LOCAL_STORAGE_KEY;
  }
  return QUESTIONS_LOCAL_STORAGE_KEY + "_" + slug;
};

export type Question = {
  question: string;
  answer: string;
  category: string;
  id: number;
};

declare global {
  interface Array<T> {
    shuffle(): T[];
  }
}

Array.prototype.shuffle = function () {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};

const getQuestions = async (): Promise<Question[]> => {
  try {
    const slug = getSlugFromUrl();
    if (slug === "") {
      return questionsFromFile;
    }
    const questionsModule = await import(`../assets/questions-${slug}.json`);
    return questionsModule.default;
  } catch (e) {
    console.error(e);
    alert(
      "Une erreur est survenue lors de la récupération des questions. Veuillez recharger la page."
    );
    return [];
  }
};

export const initQuestions = async (): Promise<void> => {
  const storedQuestions = localStorage.getItem(getQuestionsLocalStorageKey());
  const questions = await getQuestions();
  if (
    storedQuestions !== null &&
    JSON.parse(storedQuestions).length !== questions.length &&
    !confirm(
      "Les questions ont déjà été initialisées. Voulez-vous les recharger ?"
    )
  ) {
    return; // Les questions ont déjà été initialisées
  }
  localStorage.setItem(
    getQuestionsLocalStorageKey(),
    JSON.stringify(questions.shuffle())
  );
};

export const reloadQuestionsByCategory = (category: string): void => {
  let questions = JSON.parse(
    localStorage.getItem(getQuestionsLocalStorageKey()) || "[]"
  ) as Question[];
  const questionsByCategory = questionsFromFile
    .filter((q) => q.category === category)
    .shuffle();
  questions = questions.concat(questionsByCategory);
  localStorage.setItem(
    getQuestionsLocalStorageKey(),
    JSON.stringify(questions)
  );
  alert("Les questions de la catégorie " + category + " ont été rechargées");
};

export const reloadGame = async (): Promise<void> => {
  localStorage.removeItem(getQuestionsLocalStorageKey());
  await initQuestions();
  alert("Le jeu a été réinitialisé");
};

export const getQuestionByCategory = (category: string): Question | null => {
  let questions = JSON.parse(
    localStorage.getItem(getQuestionsLocalStorageKey()) || "[]"
  ) as Question[];
  const index = questions.findIndex((q) => q.category === category);

  if (index === -1) {
    return null; // Plus de questions disponibles pour cette catégorie
  }

  const question = questions[index];
  questions.splice(index, 1);
  localStorage.setItem(
    getQuestionsLocalStorageKey(),
    JSON.stringify(questions)
  );

  return question;
};

export const getCategories = async (): Promise<string[]> => {
  return (await getQuestions())
    .map((q) => q.category)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();
};
