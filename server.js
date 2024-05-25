const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer"); // For handling file uploads
const path = require("path");
const app = express();
const port = 3000;

// Dummy user and video data stored in memory (in production, use a database)
let users = [];
let videos = [];

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Route for serving the home page
app.get("/", (req, res) => {
    const username = req.cookies.username || "guest";
    res.sendFile(__dirname + "/index.html");
});

// Route for serving the login page
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

// Route for serving the register page
app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});

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
    res.cookie("username", username);
    res.status(200).json({ message: "Login successful" });
});

// Route for user logout
app.post("/logout", (req, res) => {
    res.clearCookie("username");
    res.status(200).json({ message: "Logout successful" });
});

// Route for uploading videos
app.post("/upload", upload.single("video"), (req, res) => {
    const { username } = req.cookies;
    const video = {
        username: username || "guest",
        filename: req.file.filename,
        path: req.file.path
    };
    videos.push(video);
    res.status(200).json({ message: "Video uploaded successfully" });
});

// Route for getting all videos
app.get("/videos", (req, res) => {
    res.json(videos);
});

// Route for getting user's videos
app.get("/user/:username/videos", (req, res) => {
    const { username } = req.params;
    const userVideos = videos.filter(video => video.username === username);
    res.json(userVideos);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
