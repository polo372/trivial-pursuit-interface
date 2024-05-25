let questions = {
    INC: [],
    SAP: [],
    PPABE: [],
    FDF: [],
    GOG: [],
    CAD: []
};

// Chargement des questions initiales
function loadQuestions() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "questions.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xml = xhr.responseXML;
            const categories = xml.getElementsByTagName("category");
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const categoryName = category.getAttribute("name");
                const questionNodes = category.getElementsByTagName("question");
                questions[categoryName] = [];
                for (let j = 0; j < questionNodes.length; j++) {
                    const questionNode = questionNodes[j];
                    const questionText = questionNode.getElementsByTagName("text")[0].textContent;
                    const answerText = questionNode.getElementsByTagName("answer")[0].textContent;
                    questions[categoryName].push({ question: questionText, answer: answerText });
                }
            }
        }
    };
    xhr.send();
}

let currentQuestionLevel = null;
let currentQuestionIndex = 0;

function showQuestion(level) {
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

// Ajout de nouvelles questions via le formulaire administrateur
function addQuestion(event) {
    event.preventDefault();
    const category = document.getElementById('category').value;
    const questionInput = document.getElementById('question-input').value;
    const answerInput = document.getElementById('answer-input').value;
    const password = document.getElementById('password-input').value;

    if (password !== 'votreMotDePasseSécurisé') {
        alert('Mot de passe incorrect');
        return;
    }

    if (questions[category]) {
        questions[category].push({ question: questionInput, answer: answerInput });
        alert('Question ajoutée avec succès');
        document.getElementById('add-question-form').reset();
    } else {
        alert('Catégorie invalide');
    }
}

// Chargement des questions initiales lorsque la page se charge
window.onload = loadQuestions;
