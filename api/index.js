const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path')

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());

const dbConfig = {
  host: "127.0.0.1",
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE
};

app.use(express.json()); // express.json() => middleware

//
app.get("/api", async (req, res) => {
  res.status(200).json({ message: "API is running" }); // array of objects with our data
});

// POST, GET, PUT, PATCH, DELETE
// "/api/register" endpoint > http://localhost/api/register
app.post("/api/register", async (req, res) => {
  /// every time we want create something

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const conn = await mysql.createConnection(dbConfig);

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    await conn.execute(query, [name, email, password]);
    await conn.end();
    res.status(201).json({ message: "Created with success" });
  } catch (e) {
    res.status(500).json({ error: `Something happens in the server: ${e}` });
  }
});

//
app.get("/api/register", async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute("SELECT * FROM users");
    await conn.end();
    res.status(200).json(rows); // array of objects with our data
  } catch (e) {
    res.status(500).json({ error: "Fail" });
  }
});

app.listen(process.env.API_PORT, () => {
  console.log(`The server is running, PORT: ${process.env.API_PORT}`);
});
