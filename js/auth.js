async function checkAuth() {
    const { data: { session } } = await sb.auth.getSession();
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    const isRoot = !window.location.pathname.includes('/pages/');

    if (session) {
        loginBtn.textContent = 'Profile';
        loginBtn.className = 'btn-login';
        loginBtn.onclick = () => {
            const base = isRoot ? 'pages/' : '';
            window.location.href = base + 'profile.html';
        };
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.className = 'btn-login';
        loginBtn.onclick = () => {
            const base = isRoot ? 'pages/' : '';
            window.location.href = base + 'login.html';
        };
    }
}

async function logout() {
    await sb.auth.signOut();
    window.location.reload();
}

checkAuth();