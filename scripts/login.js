document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/api/login', {
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
});