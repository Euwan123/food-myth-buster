// Load trending myths on homepage
async function loadTrendingMyths() {
    const grid = document.getElementById('trendingGrid');
    
    try {
        // Fetch featured myths
        const { data: myths, error } = await supabase
            .from('myths')
            .select(`
                *,
                categories(name, slug, color)
            `)
            .eq('featured', true)
            .order('views', { ascending: false })
            .limit(4);

        if (error) throw error;

        if (myths.length === 0) {
            grid.innerHTML = '<p class="loading">No myths found. Add some in Supabase!</p>';
            return;
        }

        // Clear loading
        grid.innerHTML = '';

        // Display myths
        myths.forEach(myth => {
            const card = document.createElement('div');
            card.className = 'myth-card';
            card.onclick = () => window.location.href = `pages/detail.html?id=${myth.id}`;
            
            card.innerHTML = `
                <h3>${myth.title}</h3>
                <span class="verdict-badge verdict-${myth.verdict}">${myth.verdict.replace('_', ' ')}</span>
                <p class="cta">Click to see evidence →</p>
            `;
            
            grid.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading myths:', error);
        grid.innerHTML = '<p class="loading">Error loading myths. Check console.</p>';
    }
}

// Load categories
async function loadCategories() {
    const grid = document.getElementById('categoryGrid');
    
    try {
        const { data: categories, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (error) throw error;

        grid.innerHTML = '';

        categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.style.backgroundColor = cat.color + '20';
            card.style.borderColor = cat.color;
            card.onclick = () => window.location.href = `pages/browse.html?category=${cat.slug}`;
            
            card.innerHTML = `
                <div class="icon">${cat.icon}</div>
                <h3 style="color: ${cat.color}">${cat.name}</h3>
                <p class="count">${cat.myth_count} myths verified</p>
            `;
            
            grid.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Search functionality
document.getElementById('searchBtn')?.addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    if (query.trim()) {
        window.location.href = `pages/search.html?q=${encodeURIComponent(query)}`;
    }
});

document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});

// Load on page load
if (document.getElementById('trendingGrid')) {
    loadTrendingMyths();
}
if (document.getElementById('categoryGrid')) {
    loadCategories();
}