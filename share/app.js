// share-server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATABASE_DIR = path.join(__dirname, 'shared-databases');

if (!fs.existsSync(DATABASE_DIR)) {
    fs.mkdirSync(DATABASE_DIR);
}

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to upload a database file
app.post('/upload', (req, res) => {
    const { databaseName, content } = req.body;

    if (!databaseName || !content) {
        return res.status(400).send('Database name and content are required');
    }

    const filePath = path.join(DATABASE_DIR, `${databaseName}.sqlite`);
    fs.writeFile(filePath, Buffer.from(content, 'base64'), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to save database');
        }

        res.status(200).send('Database uploaded successfully');
    });
});

// Endpoint to download a database file
app.get('/download/:databaseName', (req, res) => {
    const { databaseName } = req.params;
    const filePath = path.join(DATABASE_DIR, `${databaseName}.sqlite`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Database not found');
    }

    const fileContent = fs.readFileSync(filePath);
    res.status(200).send(fileContent.toString('base64'));
});

app.listen(PORT, () => {
    console.log(`Share server running on port ${PORT}`);
});