// Check if the user is logged in and display the username
function checkLoggedIn() {
    fetch("/check-login")
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn) {
            alert(`You are logged in as ${data.username}`);
        } else {
            alert("You are logged out");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
}

// Event listener for login form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    login(username, password);
});

// Event listener for logout button
document.getElementById("logout-button").addEventListener("click", function() {
    logout();
});

// Function to handle user login
function login(username, password) {
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            alert("Login successful");
            checkLoggedIn();
        } else {
            alert("Login failed");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
}

// Function to handle user logout
function logout() {
    fetch("/logout", {
        method: "POST"
    })
    .then(response => {
        if (response.ok) {
            alert("Logout successful");
            checkLoggedIn();
        } else {
            alert("Logout failed");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    });
}

// Call checkLoggedIn when the page loads
window.addEventListener("load", checkLoggedIn);
