const express = require("express");
const app = express();
const port = 3000;

// Dummy video data
const videos = [
    { id: 1, title: "Video 1", thumbnail: "thumbnail1.jpg", videoUrl: "video1.mp4" },
    { id: 2, title: "Video 2", thumbnail: "thumbnail2.jpg", videoUrl: "video2.mp4" },
    { id: 3, title: "Video 3", thumbnail: "thumbnail3.jpg", videoUrl: "video3.mp4" },
    // Add more video objects as needed
];

// Route to get video data
app.get("/api/videos", (req, res) => {
    res.json(videos);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
