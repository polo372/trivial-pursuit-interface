let questions = {};

document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    Papa.parse(file, {
        header: true,
        complete: function(results) {
            questions = results.data.reduce((acc, row) => {
                const category = row.category;
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push({ question: row.question, answer: row.answer });
                return acc;
            }, {});
            console.log('Questions loaded:', questions);
        }
    });
});

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
