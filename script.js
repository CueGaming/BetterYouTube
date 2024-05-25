// This is where you would handle fetching video data from the backend and dynamically populate the video-container
// For demonstration purposes, let's simulate some video data
const videos = [
    { id: 1, title: "Video 1", thumbnail: "thumbnail1.jpg" },
    { id: 2, title: "Video 2", thumbnail: "thumbnail2.jpg" },
    { id: 3, title: "Video 3", thumbnail: "thumbnail3.jpg" },
    // Add more video objects as needed
];

// Function to render video thumbnails
function renderVideos() {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = ""; // Clear previous content

    videos.forEach(video => {
        const videoElement = document.createElement("div");
        videoElement.classList.add("video-thumbnail");
        videoElement.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}">
            <p class="video-title">${video.title}</p>
        `;
        videoContainer.appendChild(videoElement);
    });
}

// Call the function to render videos when the page loads
window.addEventListener("load", renderVideos);
