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

function flipCard(cardElement, level) {
    if (cardElement.classList.contains('flipped')) {
        cardElement.classList.remove('flipped');
        return;
    }

    const questionElement = cardElement.querySelector('.card-back');
    
    if (questions[level] && questions[level].length > 0) {
        currentQuestionLevel = level;
        currentQuestionIndex = Math.floor(Math.random() * questions[level].length);
        questionElement.textContent = questions[level][currentQuestionIndex].question;
        cardElement.classList.add('flipped');
    } else {
        questionElement.textContent = "Pas de questions disponibles pour cette catégorie.";
        cardElement.classList.add('flipped');
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
    const answerElement = document.getElementById('answer');
    answerElement.textContent = "";
    currentQuestionLevel = null;
    currentQuestionIndex = 0;
    document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
}
