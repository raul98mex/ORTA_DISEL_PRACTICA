document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const errorMsg = document.getElementById('error');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    errorMsg.style.display = 'none'; // Hide error message initially

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const validUsername = 'raul';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
      window.location.href = 'index.html';
    } else {
      errorMsg.style.display = 'block'; // Show the error message
    }
  });

  // 🟢 These should be inside DOMContentLoaded too
  usernameInput.addEventListener('input', () => errorMsg.style.display = 'none');
  passwordInput.addEventListener('input', () => errorMsg.style.display = 'none');
});

  document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        const confirmed = confirm('¿Seguro que quieres cerrar sesión?');
        if (confirmed) {
          sessionStorage.removeItem('loggedIn'); // clear login session
          window.location.href = 'login.html';   // redirect to login
        }
      });
    }
  });