const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Dummy user data stored in memory (in production, use a database)
let users = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route for user registration
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    if (users.find(user => user.username === username)) {
        return res.status(409).json({ message: "Username already exists" });
    }
    // Store user data (in production, use a database)
    users.push({ username, password });
    res.status(201).json({ message: "User registered successfully" });
});

// Route for user login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }
    res.status(200).json({ message: "Login successful" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
