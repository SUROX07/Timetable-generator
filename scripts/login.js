const API_URL = 'https://your-backend-url.com' || 'http://localhost:5000';

document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('loggedInUser', JSON.stringify(data.user));
            let x = JSON.parse(localStorage.getItem('loggedInUser'));
            alert('Welcome! '+x.name);
            window.location.href = 'dashboard.html';    
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error connecting to server. Please try again.');
    }
});