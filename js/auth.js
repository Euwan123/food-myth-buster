async function checkAuth() {
    const { data: { session } } = await sb.auth.getSession();
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    if (session) {
        loginBtn.textContent = 'Logout';
        loginBtn.className = 'btn-login';
        loginBtn.onclick = logout;
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.className = 'btn-login';
        const isRoot = !window.location.pathname.includes('/pages/');
        loginBtn.onclick = () => window.location.href = isRoot ? 'pages/login.html' : 'login.html';
    }
}

async function logout() {
    await sb.auth.signOut();
    window.location.reload();
}

checkAuth();