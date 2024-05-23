const questions = {
    INC: [
        { question: "Quelle est la capitale de la France ?", answer: "Paris" },
        { question: "Quelle est la monnaie de la France ?", answer: "Euro" }
    ],
    SAP: [
        { question: "Combien de couleurs y a-t-il dans un arc-en-ciel ?", answer: "Sept" },
        { question: "Quel est le symbole chimique du sodium ?", answer: "Na" }
    ],
    PPABE: [
        { question: "Quelle est la formule chimique de l'eau ?", answer: "H2O" },
        { question: "Quelle est la planète la plus proche du soleil ?", answer: "Mercure" }
    ],
    FDF: [
        { question: "Quelle est la vitesse de la lumière ?", answer: "299,792,458 mètres par seconde" },
        { question: "Quelle est l'unité de mesure de la force ?", answer: "Newton" }
    ],
    GOG: [
        { question: "Quel est le plus grand océan sur Terre ?", answer: "Océan Pacifique" },
        { question: "Quelle est la montagne la plus haute du monde ?", answer: "Mont Everest" }
    ],
    CAD: [
        { question: "Quelle est la langue la plus parlée au monde ?", answer: "Mandarin" },
        { question: "Quel est le pays le plus peuplé du monde ?", answer: "Chine" }
    ]
};

let currentQuestionLevel = null;
let currentQuestionIndex = 0;

function showQuestion(level) {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    
    if (questions[level] && questions[level].length > 0) {
        currentQuestionLevel = level;
        currentQuestionIndex = Math.floor(Math.random() * questions[level].length);
        questionElement.textContent = questions[level][currentQuestionIndex].question;
        answerElement.textContent = "";
    } else {
        questionElement.textContent = "Pas de questions disponibles pour cette catégorie.";
        answerElement.textContent = "";
        currentQuestionLevel = null;
    }
}

function showAnswer() {
    if (currentQuestionLevel !== null && questions[currentQuestionLevel] && questions[currentQuestionLevel].length > 0) {
        const answerElement = document.getElementById('answer');
        answerElement.textContent = questions[currentQuestionLevel][currentQuestionIndex].answer;
    }
}

function reset() {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    questionElement.textContent = "";
    answerElement.textContent = "";
    currentQuestionLevel = null;
    currentQuestionIndex = 0;
}
