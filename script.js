const questions = {
    1: { question: "Question de Niveau 1", answer: "Réponse de Niveau 1" },
    2: { question: "Question de Niveau 2", answer: "Réponse de Niveau 2" },
    3: { question: "Question de Niveau 3", answer: "Réponse de Niveau 3" },
    4: { question: "Question de Niveau 4", answer: "Réponse de Niveau 4" },
    5: { question: "Question de Niveau 5", answer: "Réponse de Niveau 5" },
    6: { question: "Question de Niveau 6", answer: "Réponse de Niveau 6" },
};

function showQuestion(level) {
    document.getElementById('question').textContent = questions[level].question;
    document.getElementById('answer').textContent = questions[level].answer;
}
