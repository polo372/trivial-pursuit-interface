const questions = {
    INC: { question: "Quelle est la capitale de la France ?", answer: "Paris" },
    SAP: { question: "Combien de couleurs y a-t-il dans un arc-en-ciel ?", answer: "Sept" },
    PPABE: { question: "Quelle est la formule chimique de l'eau ?", answer: "H2O" },
    FDF: { question: "Quelle est la vitesse de la lumière ?", answer: "299,792,458 mètres par seconde" },
    GOG: { question: "Quel est le plus grand océan sur Terre ?", answer: "Océan Pacifique" },
    CAD: { question: "Quelle est la langue la plus parlée au monde ?", answer: "Mandarin" }
};

let currentQuestionLevel = null;

function showQuestion(level) {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    
    if (questions[level]) {
        questionElement.textContent = questions[level].question;
        answerElement.textContent = "";
        currentQuestionLevel = level;
    } else {
        questionElement.textContent = "Pas de questions disponibles pour ce niveau.";
        answerElement.textContent = "";
        currentQuestionLevel = null;
    }
}

function showAnswer() {
    if (currentQuestionLevel !== null && questions[currentQuestionLevel]) {
        const answerElement = document.getElementById('answer');
        answerElement.textContent = questions[currentQuestionLevel].answer;
    }
}
