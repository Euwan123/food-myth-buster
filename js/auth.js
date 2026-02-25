async function checkAuth() {
    const { data: { session } } = await sb.auth.getSession();
    const loginBtn = document.getElementById('loginBtn');
    const profileLink = document.getElementById('profileLink');
    if (!loginBtn) return;

    if (session) {
        loginBtn.textContent = 'Logout';
        loginBtn.className = 'btn-login';
        loginBtn.onclick = logout;
        if (profileLink) profileLink.style.display = 'inline-block';
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.className = 'btn-login';
        const isRoot = !window.location.pathname.includes('/pages/');
        loginBtn.onclick = () => window.location.href = isRoot ? 'pages/login.html' : 'login.html';
        if (profileLink) profileLink.style.display = 'none';
    }
}

async function logout() {
    await sb.auth.signOut();
    window.location.reload();
}

checkAuth();