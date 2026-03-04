

async function loadPolls() {
    const container = document.getElementById('pollsContainer');

    try {
        const { data: polls, error } = await sb
            .from('polls')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (polls.length === 0) {
            container.innerHTML = '<p class="loading">No polls available. Check back later!</p>';
            return;
        }

        container.innerHTML = '';

        polls.forEach(poll => {
            const pollCard = document.createElement('div');
            pollCard.className = 'poll-card';

            const totalVotes = poll.votes1 + poll.votes2;
            const percent1 = totalVotes > 0 ? (poll.votes1 / totalVotes * 100).toFixed(1) : 0;
            const percent2 = totalVotes > 0 ? (poll.votes2 / totalVotes * 100).toFixed(1) : 0;

            pollCard.innerHTML = `
                <h3>${poll.question}</h3>
                <div class="poll-options">
                    <div class="poll-option">
                        <span>${poll.option1}</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percent1}%"></div>
                        </div>
                        <span class="vote-count">${poll.votes1} votes (${percent1}%)</span>
                    </div>
                    <div class="poll-option">
                        <span>${poll.option2}</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percent2}%"></div>
                        </div>
                        <span class="vote-count">${poll.votes2} votes (${percent2}%)</span>
                    </div>
                </div>
                <p class="total-votes">Total votes: ${totalVotes}</p>
            `;

            container.appendChild(pollCard);
        });

    } catch (error) {
        console.error('Error loading polls:', error);
        container.innerHTML = '<p class="loading">Error loading polls. Check console.</p>';
    }
}

async function loadDiscussions() {
    const container = document.getElementById('discussionsContainer');

    container.innerHTML = `
        <div class="discussion-item">
            <h4>Discussion Feature Coming Soon!</h4>
            <p>We're working on adding user discussions. Stay tuned!</p>
        </div>
    `;
}

if (document.getElementById('pollsContainer')) {
    loadPolls();
}
if (document.getElementById('discussionsContainer')) {
    loadDiscussions();
}
