require("dotenv").config();
const express = require("express");

const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api", async (req, res) => {
  res.send(`
    <h4>API List</h4>
    <p>/api/diemhe4_k17</p>
    <p>/api/diemhe4_k18</p>
    <p>/api/diemhe4_k17__DTN</p>
    <p>/api/diemhe4_k18__DTN</p>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  `);
});

const getStudent = ({ id, res, file }) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) res.status(400).statusMessage(err.message);
    else {
      const myData = JSON.parse(data);

      const student = myData.find(item => {
        return item.mssv === id;
      });

      if (!student) {
        res.status(400).send(`Hiện tại chưa dữ liệu cho sinh viên ${id}`);
      } else {
        res.json(student);
      }
    }
  });
};

const getStudents = ({ res, file }) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) res.status(400).statusMessage(err.message);
    else res.json(JSON.parse(data));
  });
};

// APIs
app.get("/api/diemhe4_k17/:id", async (req, res) => {
  const { id } = req.params;
  getStudent({ id, res, file: "./db/DiemHe4_K17.json" });
});

app.get("/api/diemhe4_k17", async ({ res }) => {
  getStudents({ res, file: "./db/DiemHe4_K17.json" });
});

app.get("/api/diemhe4_k18/:id", async (req, res) => {
  const { id } = req.params;
  getStudent({ id, res, file: "./db/DiemHe4_K18.json" });
});

app.get("/api/diemhe4_k18", async ({ res }) => {
  getStudents({ res, file: "./db/DiemHe4_K18.json" });
});

app.get("/api/diemhe4_k17__DTN", async (req, res) => {
  getStudents({ res, file: "./db/DiemHe4_K17__DTN.json" });
});

app.get("/api/diemhe4_k17__DTN/:id", async (req, res) => {
  const { id } = req.params;
  getStudent({ id, file: "./db/DiemHe4_K17__DTN.json", res });
});

app.get("/api/diemhe4_k18__DTN", async (req, res) => {
  getStudents({ res, file: "./db/DiemHe4_K18__DTN.json" });
});

app.get("/api/diemhe4_k18__DTN/:id", async (req, res) => {
  const { id } = req.params;
  getStudent({ id, res, file: "./db/DiemHe4_K18__DTN.json" });
});

app.listen(PORT, () => console.log("Listen on port " + PORT));
