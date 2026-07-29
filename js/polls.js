

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

            const title = document.createElement('h3');
            title.textContent = poll.question;

            const options = document.createElement('div');
            options.className = 'poll-options';

            const optionA = document.createElement('div');
            optionA.className = 'poll-option';
            const optionAText = document.createElement('span');
            optionAText.textContent = poll.option1;
            const optionAbar = document.createElement('div');
            optionAbar.className = 'progress-bar';
            const optionAFill = document.createElement('div');
            optionAFill.className = 'progress-fill';
            optionAFill.style.width = percent1 + '%';
            optionAbar.appendChild(optionAFill);
            const optionACount = document.createElement('span');
            optionACount.className = 'vote-count';
            optionACount.textContent = poll.votes1 + ' votes (' + percent1 + '%)';
            optionA.appendChild(optionAText);
            optionA.appendChild(optionAbar);
            optionA.appendChild(optionACount);

            const optionB = document.createElement('div');
            optionB.className = 'poll-option';
            const optionBText = document.createElement('span');
            optionBText.textContent = poll.option2;
            const optionBbar = document.createElement('div');
            optionBbar.className = 'progress-bar';
            const optionBFill = document.createElement('div');
            optionBFill.className = 'progress-fill';
            optionBFill.style.width = percent2 + '%';
            optionBbar.appendChild(optionBFill);
            const optionBCount = document.createElement('span');
            optionBCount.className = 'vote-count';
            optionBCount.textContent = poll.votes2 + ' votes (' + percent2 + '%)';
            optionB.appendChild(optionBText);
            optionB.appendChild(optionBbar);
            optionB.appendChild(optionBCount);

            options.appendChild(optionA);
            options.appendChild(optionB);

            const total = document.createElement('p');
            total.className = 'total-votes';
            total.textContent = 'Total votes: ' + totalVotes;

            pollCard.appendChild(title);
            pollCard.appendChild(options);
            pollCard.appendChild(total);
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
