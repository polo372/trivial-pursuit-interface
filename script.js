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
let countdownTimer = null;

function showQuestion(level) {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    
    if (questions[level] && questions[level].length > 0) {
        currentQuestionLevel = level;
        currentQuestionIndex = Math.floor(Math.random() * questions[level].length);
        const question = questions[level][currentQuestionIndex].question;
        const cardBack = document.getElementById(`${level}-back`);
        cardBack.textContent = question;

        // Flip the card
        const card = document.querySelector(`.card.${level}`);
        card.classList.add('flip');

        // Reset the answer
        answerElement.textContent = "";

        // Start a 20-second countdown to show the answer automatically
        if (countdownTimer) {
            clearTimeout(countdownTimer);
        }
        countdownTimer = setTimeout(showAnswer, 20000);
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

    // Remove the flip class from all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.remove('flip'));

    // Clear the countdown timer
    if (countdownTimer) {
        clearTimeout(countdownTimer);
    }
}
