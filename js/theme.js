var themePreferenceKey = 'fmb-theme';

function getSystemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(mode) {
    var finalMode = mode === 'system' ? (getSystemPrefersDark() ? 'dark' : 'light') : mode;
    document.body.classList.toggle('dark', finalMode === 'dark');
    var toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.classList.toggle('active', finalMode === 'dark');
        updateThemeToggleIcon(toggle, finalMode === 'dark');
    }
}

function updateThemeToggleIcon(toggle, isDark) {
    toggle.textContent = isDark ? '🌙' : '☀️';
}

function setThemePreference(mode) {
    localStorage.setItem(themePreferenceKey, mode);
    applyTheme(mode);
}

function initTheme() {
    var stored = localStorage.getItem(themePreferenceKey);
    var mode = stored || 'system';
    applyTheme(mode);

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
            var current = localStorage.getItem(themePreferenceKey) || 'system';
            if (current === 'system') applyTheme('system');
        });
    }

    var toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', function () {
            var current = localStorage.getItem(themePreferenceKey) || 'system';
            if (current === 'light') setThemePreference('dark');
            else if (current === 'dark') setThemePreference('system');
            else setThemePreference('light');
        });
    }

    var radios = document.querySelectorAll('[name="themePreference"]');
    if (radios.length) {
        radios.forEach(function (r) {
            r.checked = r.value === (stored || 'system');
            r.addEventListener('change', function () {
                if (this.checked) setThemePreference(this.value);
            });
        });
    }
}

(function() {
    var stored = localStorage.getItem(themePreferenceKey) || 'system';
    var isDark = stored === 'dark' || (stored === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) document.body.classList.add('dark');
})();

initTheme();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}