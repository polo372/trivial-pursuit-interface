const questions = {
    1: { question: "Quelle est la capitale de la France ?", answer: "Paris" },
    2: { question: "Combien de couleurs y a-t-il dans un arc-en-ciel ?", answer: "Sept" },
    3: { question: "Quelle est la formule chimique de l'eau ?", answer: "H2O" },
    4: { question: "Quelle est la vitesse de la lumière ?", answer: "299,792,458 mètres par seconde" },
    5: { question: "Quel est le plus grand océan sur Terre ?", answer: "Océan Pacifique" },
    6: { question: "Quelle est la langue la plus parlée au monde ?", answer: "Mandarin" }
};

function showQuestion(level) {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    
    if (questions[level]) {
        questionElement.textContent = questions[level].question;
        answerElement.textContent = questions[level].answer;
    } else {
        questionElement.textContent = "Pas de questions disponibles pour ce niveau.";
        answerElement.textContent = "";
    }
}
