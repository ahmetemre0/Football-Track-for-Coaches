const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const fs = require('fs');

const SHARE_SERVER_URL = 'http://localhost:3001';
const LOCAL_DB_PATH = './db.sqlite';

exports.download = async (req, res) => {
    try {
        const databaseName = req.params.databaseName;
        const response = await axios.get(`${SHARE_SERVER_URL}/download/${databaseName}`);
        const decodedContent = Buffer.from(response.data, 'base64');

        fs.writeFileSync(LOCAL_DB_PATH, decodedContent);

        res.status(200).send('Database downloaded and updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to download database');
    }
}

exports.upload = async (req, res) => {
    try {
        const databaseName = req.body.databaseName;
        const fileContent = fs.readFileSync(LOCAL_DB_PATH);
        const encodedContent = fileContent.toString('base64');

        await axios.post(`${SHARE_SERVER_URL}/upload`, {
            databaseName,
            content: encodedContent,
        });

        res.status(200).send('Database synced successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to sync database');
    }
}