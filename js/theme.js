// var themePreferenceKey = 'fmb-theme';

// function getSystemPrefersDark() {
//     return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
// }

// function applyTheme(mode) {
//     var finalMode = mode === 'system' ? (getSystemPrefersDark() ? 'dark' : 'light') : mode;
//     document.body.classList.toggle('dark', finalMode === 'dark');
//     var toggle = document.getElementById('themeToggle');
//     if (toggle) toggle.classList.toggle('active', finalMode === 'dark');
// }

// function setThemePreference(mode) {
//     localStorage.setItem(themePreferenceKey, mode);
//     applyTheme(mode);
// }

// function initTheme() {
//     var stored = localStorage.getItem(themePreferenceKey);
//     var mode = stored || 'system';
//     applyTheme(mode);

//     if (window.matchMedia) {
//         window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
//             var current = localStorage.getItem(themePreferenceKey) || 'system';
//             if (current === 'system') applyTheme('system');
//         });
//     }

//     var toggle = document.getElementById('themeToggle');
//     if (toggle) {
//         toggle.addEventListener('click', function () {
//             var current = localStorage.getItem(themePreferenceKey) || 'system';
//             if (current === 'light') setThemePreference('dark');
//             else if (current === 'dark') setThemePreference('system');
//             else setThemePreference('light');
//         });
//     }

//     var radios = document.querySelectorAll('[name="themePreference"]');
//     if (radios.length) {
//         radios.forEach(function (r) {
//             r.checked = r.value === (stored || 'system');
//             r.addEventListener('change', function () {
//                 if (this.checked) setThemePreference(this.value);
//             });
//         });
//     }
// }

// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', initTheme);
// } else {
//     initTheme();
// }

