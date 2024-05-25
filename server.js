const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./trivial-pursuit.db');

app.use(bodyParser.json());
app.use(express.static('public'));

// Créer la table des questions si elle n'existe pas
db.run(`CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
)`);

// Route pour ajouter une question
app.post('/api/add-question', (req, res) => {
    const { category, question, answer } = req.body;
    const stmt = db.prepare('INSERT INTO questions (category, question, answer) VALUES (?, ?, ?)');
    stmt.run(category, question, answer, (err) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'ajout de la question');
        } else {
            res.status(200).send('Question ajoutée avec succès');
        }
    });
    stmt.finalize();
});

// Route pour récupérer les questions
app.get('/api/questions', (req, res) => {
    const { category } = req.query;
    db.all('SELECT * FROM questions WHERE category = ?', [category], (err, rows) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des questions');
        } else {
            res.json(rows);
        }
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
