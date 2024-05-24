let questions = {};
let usedQuestions = {}; // Object to track used questions
let currentFlippedCard = null; // Track the currently flipped card

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
            usedQuestions = JSON.parse(JSON.stringify(questions)); // Initialize usedQuestions
            console.log('Questions loaded:', questions);
        }
    });
});

let currentQuestionLevel = null;
let currentQuestionIndex = 0;

function flipCard(cardElement, level) {
    if (currentFlippedCard && currentFlippedCard !== cardElement) {
        currentFlippedCard.classList.remove('flipped');
        currentFlippedCard = null;
    }

    if (!cardElement.classList.contains('flipped')) {
        const questionElement = cardElement.querySelector('.card-back');

        if (usedQuestions[level] && usedQuestions[level].length > 0) {
            currentQuestionLevel = level;
            currentQuestionIndex = Math.floor(Math.random() * usedQuestions[level].length);
            questionElement.textContent = usedQuestions[level][currentQuestionIndex].question;
            cardElement.classList.add('flipped');

            // Log the question to check if it's correct
            console.log(`Showing question: ${usedQuestions[level][currentQuestionIndex].question}`);

            // Remove the question from the usedQuestions array
            usedQuestions[level].splice(currentQuestionIndex, 1);

            currentFlippedCard = cardElement; // Set the current flipped card
        } else {
            questionElement.textContent = "Pas de questions disponibles pour cette catégorie.";
            cardElement.classList.add('flipped');
            currentQuestionLevel = null;
        }
    }
}

function showAnswer() {
    if (currentQuestionLevel !== null && questions[currentQuestionLevel] && questions[currentQuestionLevel].length > 0) {
        const answerElement = document.getElementById('answer');
        answerElement.textContent = questions[currentQuestionLevel][currentQuestionIndex].answer;

        // Log the answer to check if it's correct
        console.log(`Showing answer: ${questions[currentQuestionLevel][currentQuestionIndex].answer}`);
    }
}

function reset() {
    const answerElement = document.getElementById('answer');
    answerElement.textContent = "";
    currentQuestionLevel = null;
    currentQuestionIndex = 0;
    document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
    usedQuestions = JSON.parse(JSON.stringify(questions)); // Reset usedQuestions for a new session
    currentFlippedCard = null; // Reset current flipped card

    // Log to indicate reset
    console.log('Game reset');
}
