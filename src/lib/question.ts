import questionsFromFile from '../assets/questions.json';

const QUESTIONS_LOCAL_STORAGE_KEY = 'questions_trivial_pursuit';

export type Question = {
    question: string
    answer: string
    category: string
    id: number
}

declare global {
    interface Array<T> {
        shuffle(): T[];
    }
}

Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};

export const initQuestions = () : void => {
    if (localStorage.getItem(QUESTIONS_LOCAL_STORAGE_KEY) !== null) {
        return; // Les questions ont déjà été initialisées
    } 
    localStorage.setItem(QUESTIONS_LOCAL_STORAGE_KEY, JSON.stringify(questionsFromFile.shuffle()))
}

export const reloadGame = () : void => {
    localStorage.removeItem(QUESTIONS_LOCAL_STORAGE_KEY)
    initQuestions()
    alert('Le jeu a été réinitialisé');
}

export const getQuestionByCategory = (category: string) : Question | null => {
    let questions = JSON.parse(localStorage.getItem(QUESTIONS_LOCAL_STORAGE_KEY) || '[]') as Question[];
    const index = questions.findIndex(q => q.category === category);

    if (index === -1) {
        return null; // Plus de questions disponibles pour cette catégorie
    }

    const question = questions[index];
    questions.splice(index, 1);
    localStorage.setItem(QUESTIONS_LOCAL_STORAGE_KEY, JSON.stringify(questions));

    return question;
}

export const getCategories = (): string[] => {
    return questionsFromFile.map(q => q.category).filter((value, index, self) => self.indexOf(value) === index).sort();
}