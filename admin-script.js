const adminPassword = 'votreMotDePasseSécurisé';  // Remplacez par votre mot de passe administrateur

function login(event) {
    event.preventDefault();
    const passwordInput = document.getElementById('admin-password').value;
    if (passwordInput === adminPassword) {
        document.getElementById('admin-login-form').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
    } else {
        alert('Mot de passe incorrect');
    }
}

async function addQuestion(event) {
    event.preventDefault();
    const category = document.getElementById('category').value;
    const question = document.getElementById('question-input').value;
    const answer = document.getElementById('answer-input').value;

    const response = await fetch('/api/add-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, question, answer })
    });

    if (response.ok) {
        alert('Question ajoutée avec succès');
        document.getElementById('add-question-form').reset();
    } else {
        alert('Erreur lors de l\'ajout de la question');
    }
}
