async function checkAuth() {
    const { data: { session } } = await sb.auth.getSession();
    const loginBtn = document.getElementById('loginBtn');
    const adminBtn = document.getElementById('adminBtn');
    if (!loginBtn) return;

    const isRoot = !window.location.pathname.includes('/pages/');

    if (session) {
        loginBtn.textContent = 'Profile';
        loginBtn.className = 'btn-login';
        loginBtn.onclick = () => {
            const base = isRoot ? 'pages/' : '';
            window.location.href = base + 'profile.html';
        };
        if (adminBtn) {
            const user = session.user;
            const isAdmin = user && user.user_metadata && user.user_metadata.role === 'admin';
            if (isAdmin) {
                adminBtn.style.display = 'inline-block';
                adminBtn.onclick = () => {
                    const base = isRoot ? 'pages/' : '';
                    window.location.href = base + 'admin.html';
                };
            } else {
                adminBtn.style.display = 'none';
            }
        }
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.className = 'btn-login';
        loginBtn.onclick = openAuthOverlay;
        if (adminBtn) adminBtn.style.display = 'none';
    }
}

async function logout() {
    await sb.auth.signOut();
    window.location.reload();
}

function openAuthOverlay() {
    var existing = document.getElementById('authOverlay');
    var isRoot = !window.location.pathname.includes('/pages/');
    var src = isRoot ? 'pages/login.html' : 'login.html';

    if (!existing) {
        var overlay = document.createElement('div');
        overlay.id = 'authOverlay';
        overlay.className = 'auth-overlay';
        overlay.innerHTML =
            '<div class="auth-overlay-inner">' +
                '<button type="button" class="auth-overlay-close" aria-label="Close login" onclick="closeAuthOverlay()">×</button>' +
                '<iframe class="auth-overlay-frame" src="' + src + '" loading="lazy"></iframe>' +
            '</div>';
        document.body.appendChild(overlay);
        existing = overlay;
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeAuthOverlay();
        });
    } else {
        var frame = existing.querySelector('iframe');
        if (frame && frame.src.indexOf(src) === -1) frame.src = src;
    }

    existing.classList.add('open');
}

function closeAuthOverlay() {
    var overlay = document.getElementById('authOverlay');
    if (overlay) overlay.classList.remove('open');
}

checkAuth();