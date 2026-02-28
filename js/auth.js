var _authReady = false;

(function() {
    var style = document.createElement('style');
    style.id = 'auth-hide';
    style.textContent = '#loginBtn, #adminBtn { visibility: hidden; }';
    document.head.appendChild(style);
})();

async function checkAuth() {
    const { data: { session } } = await sb.auth.getSession();
    const loginBtn = document.getElementById('loginBtn');
    const adminBtn = document.getElementById('adminBtn');

    const isRoot = !window.location.pathname.includes('/pages/');

    if (session) {
        if (loginBtn) {
        loginBtn.textContent = 'Profile';
        loginBtn.onclick = () => {
                const base = isRoot ? 'pages/' : '';
                window.location.href = base + 'profile.html';
            };
        }
        if (adminBtn) {
            const isAdmin = session.user?.user_metadata?.role === 'admin';
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
        if (loginBtn) {
            loginBtn.textContent = 'Login';
            loginBtn.onclick = openAuthOverlay;
        }
        if (adminBtn) adminBtn.style.display = 'none';
    }

    const hide = document.getElementById('auth-hide');
    if (hide) hide.remove();
    _authReady = true;
}

async function logout() {
    await sb.auth.signOut();
    window.location.reload();
}

function openAuthOverlay() {
    let existing = document.getElementById('authOverlay');
    const isRoot = !window.location.pathname.includes('/pages/');
    const src = isRoot ? 'pages/login.html' : 'login.html';

    if (!existing) {
        const overlay = document.createElement('div');
        overlay.id = 'authOverlay';
        overlay.className = 'auth-overlay';
        overlay.innerHTML =
            '<div class="auth-overlay-inner">' +
                '<button type="button" class="auth-overlay-close" aria-label="Close login" onclick="closeAuthOverlay()">×</button>' +
                '<iframe class="auth-overlay-frame" src="' + src + '" loading="lazy"></iframe>' +
            '</div>';
        document.body.appendChild(overlay);
        existing = overlay;
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeAuthOverlay();
        });
    } else {
        const frame = existing.querySelector('iframe');
        if (frame && frame.src.indexOf(src) === -1) frame.src = src;
    }

    existing.classList.add('open');
}

function closeAuthOverlay() {
    const overlay = document.getElementById('authOverlay');
    if (overlay) overlay.classList.remove('open');
}

window.addEventListener('message', function(e) {
    if (e.data === 'auth:success') {
        closeAuthOverlay();
        window.location.reload();
    }
});

checkAuth();