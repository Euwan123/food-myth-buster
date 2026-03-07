var _authReady = false;

(function() {
    var style = document.createElement('style');
    style.id = 'auth-hide';
    style.textContent = '#loginBtn,#adminBtn{visibility:hidden;}';
    document.head.appendChild(style);
})();

function injectPageLoader() {
    if (document.getElementById('pageLoader')) return;
    var d = document.createElement('div');
    d.id = 'pageLoader';
    d.innerHTML = '<div class="pl-inner"><div class="pl-logo">&#x1F34E;</div><div class="pl-dots"><span></span><span></span><span></span></div></div>';
    var s = document.createElement('style');
    s.textContent = '#pageLoader{position:fixed;inset:0;background:rgba(15,10,40,0.82);backdrop-filter:blur(6px);z-index:9999;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 0.2s;}#pageLoader.show{opacity:1;pointer-events:all;}.pl-inner{text-align:center;}.pl-logo{font-size:40px;margin-bottom:16px;animation:plBounce 0.8s ease infinite alternate;}.pl-dots{display:flex;gap:8px;justify-content:center;}.pl-dots span{width:10px;height:10px;border-radius:50%;background:#6c63ff;animation:plDot 1.1s ease-in-out infinite;}.pl-dots span:nth-child(2){animation-delay:0.18s;background:#9b59b6;}.pl-dots span:nth-child(3){animation-delay:0.36s;background:#764ba2;}@keyframes plBounce{from{transform:scale(0.9)translateY(0);}to{transform:scale(1.08)translateY(-6px);}}@keyframes plDot{0%,80%,100%{transform:scale(0.5);opacity:0.4;}40%{transform:scale(1.1);opacity:1;}}';
    document.head.appendChild(s);
    document.body.appendChild(d);
}

function showLoader() {
    injectPageLoader();
    var el = document.getElementById('pageLoader');
    if (el) el.classList.add('show');
}

function hideLoader() {
    var el = document.getElementById('pageLoader');
    if (el) el.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', function() {
    injectPageLoader();
    document.querySelectorAll('a[href]').forEach(function(a) {
        var href = a.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:') || a.target === '_blank') return;
        a.addEventListener('click', function(e) {
            if (e.ctrlKey || e.metaKey || e.shiftKey) return;
            showLoader();
        });
    });
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) hideLoader();
    });
    hideLoader();
});

async function checkAuth() {
    var session = null;
    try {
        var res = await sb.auth.getSession();
        session = res.data.session;
    } catch(e) {}

    var loginBtn = document.getElementById('loginBtn');
    var adminBtn = document.getElementById('adminBtn');
    var isRoot = !window.location.pathname.includes('/pages/');

    if (session) {
        var isAdmin = session.user.user_metadata && session.user.user_metadata.role === 'admin';
        if (!isAdmin) {
            var profRes = await sb.from('user_profiles').select('is_admin, display_name').eq('id', session.user.id).single();
            if (!profRes.error && profRes.data) {
                isAdmin = profRes.data.is_admin;
            }
        }
        if (loginBtn) {
            loginBtn.textContent = 'Profile';
            loginBtn.style.visibility = 'visible';
            loginBtn.onclick = function() { showLoader(); window.location.href = (isRoot ? 'pages/' : '') + 'profile.html'; };
        }
        if (adminBtn) {
            if (isAdmin) {
                adminBtn.style.display = 'inline-block';
                adminBtn.onclick = function() { showLoader(); window.location.href = (isRoot ? 'pages/' : '') + 'admin.html'; };
            } else {
                adminBtn.style.display = 'none';
            }
        }
        var mobileLoginBtn = document.getElementById('mobileLoginBtn');
        if (mobileLoginBtn) {
            mobileLoginBtn.textContent = 'My Profile';
            mobileLoginBtn.onclick = function() { showLoader(); window.location.href = (isRoot ? 'pages/' : '') + 'profile.html'; };
        }
    } else {
        if (loginBtn) {
            loginBtn.textContent = 'Login';
            loginBtn.style.visibility = 'visible';
            loginBtn.onclick = openAuthOverlay;
        }
        if (adminBtn) adminBtn.style.display = 'none';
    }

    var hide = document.getElementById('auth-hide');
    if (hide) hide.remove();
    _authReady = true;
}

function openAuthOverlay() {
    var existing = document.getElementById('authOverlay');
    var isRoot = !window.location.pathname.includes('/pages/');
    var src = isRoot ? 'pages/login.html' : 'login.html';
    if (!existing) {
        var overlay = document.createElement('div');
        overlay.id = 'authOverlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);display:flex;align-items:center;justify-content:center;z-index:5000;backdrop-filter:blur(4px);';
        overlay.innerHTML = '<div style="position:relative;width:100%;max-width:480px;border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.4);"><button onclick="closeAuthOverlay()" style="position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:50%;border:none;background:rgba(0,0,0,0.5);color:white;font-size:20px;cursor:pointer;z-index:1;display:flex;align-items:center;justify-content:center;line-height:1;">&#x00D7;</button><iframe src="' + src + '" style="width:100%;height:600px;border:none;display:block;" loading="lazy"></iframe></div>';
        document.body.appendChild(overlay);
        existing = overlay;
        overlay.addEventListener('click', function(e) { if (e.target === overlay) closeAuthOverlay(); });
    }
    existing.style.display = 'flex';
}

function closeAuthOverlay() {
    var o = document.getElementById('authOverlay');
    if (o) o.style.display = 'none';
}

window.addEventListener('message', function(e) {
    if (e.data === 'auth:success') { closeAuthOverlay(); window.location.reload(); }
});

checkAuth();