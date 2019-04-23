require('dotenv').config();
const express = require('express');

const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.send(`
    <h4>API List</h4>
    <p>/api/diemhe4_k17</p>
    <p>/api/diemhe4_k18</p>
    <p>/api/diemhe4_k17__DTN</p>
    <p>/api/diemhe4_k18__DTN</p>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  `);
});

// APIs
app.get('/api/diemhe4_k17/:id', async (req, res) => {
  const { id } = req.params;
  fs.readFile('./db/DiemHe4_K17.json', 'utf-8', (err, data) => {
    if (err) res.status(400).statusMessage(err.message);
    else {
      const myData = JSON.parse(data);
      const hs = myData.find(item => {
        return item.mssv === id;
      });
      res.json(hs || `Hiện tại chưa dữ liệu cho sinh viên ${id}`);
    }
  });
});

app.get('/api/diemhe4_k17', async (req, res) => {
  fs.readFile('./db/DiemHe4_K17.json', 'utf-8', (err, data) => {
    if (err) res.status(400).statusMessage(err.message);
    else res.json(JSON.parse(data));
  });
});

app.get('/api/diemhe4_k18', async (req, res) => {
  fs.readFile('./db/DiemHe4_K18.json', 'utf-8', (err, data) => {
    if (err) res.status(400).statusMessage(err.message);
    else res.json(JSON.parse(data));
  });
});

app.get('/api/diemhe4_k17__DTN', async (req, res) => {
  fs.readFile('./db/DiemHe4_K17__DTN.json', 'utf-8', (err, data) => {
    if (err) res.status(400).statusMessage(err.message);
    else res.json(JSON.parse(data));
  });
});

app.get('/api/diemhe4_k18__DTN', async (req, res) => {
  fs.readFile('./db/DiemHe4_K18__DTN.json', 'utf-8', (err, data) => {
    if (err) res.status(400).statusMessage(err.message);
    else res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => console.log('Listen on port ' + PORT));
