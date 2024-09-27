// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the login and signup containers
    const loginContainer = document.getElementById('loginContainer');
    const signupContainer = document.getElementById('signupContainer');

    // Get references to buttons for showing the signup and login forms
    const showSignupForm = document.getElementById('showSignupForm');
    const showLoginForm = document.getElementById('showLoginForm');

    // Event listener to switch to the signup form
    showSignupForm.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default link behavior
        loginContainer.style.display = 'none'; // Hide the login form
        signupContainer.style.display = 'block'; // Show the signup form
    });

    // Event listener to switch to the login form
    showLoginForm.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default link behavior
        signupContainer.style.display = 'none'; // Hide the signup form
        loginContainer.style.display = 'block'; // Show the login form
    });

    // Event listener for handling the signup form submission
    document.getElementById('signupForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting normally

        // Get the values from the signup form input fields
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        // Define the password pattern for validation
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{9,}$/;

        // Check if the password matches the pattern
        if (!passwordPattern.test(newPassword)) {
            alert('Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 9 characters long.');
            return; // Stop the function if the password is invalid
        }

        // Store the new credentials in localStorage
        localStorage.setItem('username', newUsername);
        localStorage.setItem('password', newPassword);

        // Show a success message and switch back to the login form
        alert('Signup successful!');
        signupContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Event listener for handling the login form submission
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting normally

        // Get the values from the login form input fields
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Retrieve the stored credentials from localStorage
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        // Check if the entered credentials match the stored ones
        if (username === storedUsername && password === storedPassword) {
            alert('Login Successful!');
            window.location.href = 'index.html'; // Redirect to the home page on successful login
        } else {
            alert('Invalid username or password!'); // Show an error message if credentials are invalid
        }
    });
});
