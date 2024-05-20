// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let textStore = {};

app.post('/update-text', (req, res) => {
  const { docId, text } = req.body;
  textStore[docId] = text;
  res.status(200).send('Text updated successfully');
});

app.get('/get-text', (req, res) => {
  const { docId } = req.query;
  const text = textStore[docId] || 'Default text';
  res.status(200).json({ text });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
