let questions = {};
let currentQuestionLevel = null;
let currentQuestionIndex = 0;

async function loadQuestions(level) {
    const response = await fetch(`/api/questions?category=${level}`);
    const data = await response.json();
    questions[level] = data;
}

async function showQuestion(level) {
    if (!questions[level]) {
        await loadQuestions(level);
    }
    if (questions[level] && questions[level].length > 0) {
        currentQuestionLevel = level;
        currentQuestionIndex = Math.floor(Math.random() * questions[level].length);
        const question = questions[level][currentQuestionIndex].question;
        document.getElementById('question').textContent = question;
        document.getElementById('answer').textContent = '';
    } else {
        alert("Pas de questions disponibles pour cette catégorie.");
        currentQuestionLevel = null;
    }
}

function showAnswer() {
    if (currentQuestionLevel !== null && questions[currentQuestionLevel] && questions[currentQuestionLevel].length > 0) {
        const answer = questions[currentQuestionLevel][currentQuestionIndex].answer;
        document.getElementById('answer').textContent = `Réponse : ${answer}`;
    }
}

function reset() {
    document.getElementById('question').textContent = '';
    document.getElementById('answer').textContent = '';
    currentQuestionLevel = null;
}
