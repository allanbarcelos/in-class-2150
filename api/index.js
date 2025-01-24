const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 3000;

const dbConfig = {
    host: "",
    user: "root",
    password: "123456",
    database: "in-class-db",
};

// JSON

app.use(express.json());

app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({error: "All fields are required"});
    }

    try {
        const conn = await mysql.createConnection(dbConfig);

        const query = "INSERT INTO userts (name, email, password) VALUES (?, ?, ?)";
        await conn.execute(query, [name, email, password]);

        await conn.end();
        res.status(201).json({message: "Created with success"});

    } catch (e) {
        res.status(500).json({error: "Something happens in the server"});
    }
});


app.get("/api/register", async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [rows] = await conn.execute("SELECT * FROM users");
        await conn.end();
        res.status(200).json(rows); // array of objects with our data

    } catch (e) {
        res.status(500).json({ error: "Fail"});
    }
});


//

async function initDatabase() {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [tables] = await conn.query("SHOW TABLES like 'users'");

        if(tables.length === 0){
            const createTableQuery = `
                CREATE TABLE users {
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(200) NOT NULL,
                    email VARCHAR(200) NOT NULL UNIQUE,
                    password VARCHAR(100) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                };
            `;

            await conn.query(createTableQuery);
            console.log("Table created");
        }

        await conn.end();

    } catch (error) {
        console.log("Database error");
        process.exit(1);
    }
}

initDatabase().then(() => {
    app.listen(port, () => {
        console.log(`The server is running, PORT: ${port}`)
    })
})
