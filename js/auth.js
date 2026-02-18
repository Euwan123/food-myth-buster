// Check if user is logged in
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    
    const loginBtn = document.getElementById('loginBtn');
    
    if (session) {
        // User is logged in
        loginBtn.textContent = 'Logout';
        loginBtn.onclick = logout;
    } else {
        // User is not logged in
        loginBtn.textContent = 'Login';
        loginBtn.onclick = () => window.location.href = 'pages/login.html';
    }
}

// Logout function
async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
}

// Run on page load
checkAuth();