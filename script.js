// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log("Resume website script loaded.");

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('#navbar .nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.getElementById('header').offsetHeight, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
            // For mobile nav: close menu after click
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('#navbar .nav-links');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active'); // For hamburger animation
        });
    }

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    // GitHub API fetching for Pinned Repositories
    const githubUsername = 'xMrDoctor';
    const projectsGrid = document.getElementById('projects-grid');

    async function fetchPinnedRepos() {
        if (!projectsGrid) return;

        // GitHub's unofficial API for pinned repos (requires scraping or a more complex setup)
        // A common workaround is to use a GraphQL query if you have a token,
        // or use a simpler REST API endpoint for public repos and manually "pin" them in code.
        // For this project, without exposing tokens client-side, let's fetch general public repos
        // and the user can manually list their "pinned" ones or we can filter by some criteria.

        // Let's use the standard Repos API and sort by stars or last updated.
        // The GitHub API for "pinned" items is not straightforward for public, unauthenticated client-side calls.
        // A common approach is to use the GraphQL API with a token, but we want to avoid client-side tokens.
        // Another is to use a proxy.
        // A simpler way for now is to fetch all public repos and let the user curate or we pick the top N.

        // The following endpoint is often used but is not officially documented and can break:
        // `https://gh-pinned-repos.egoist.dev/?username=${githubUsername}`
        // Or, we can use the official API to list repos and maybe sort by stars or manually pick.
        // Let's try the egoist.dev endpoint for simplicity first, it's common for this use case.
        // If it fails, we'll need a fallback or change strategy.

        const pinnedApiUrl = `https://gh-pinned-repos.egoist.dev/?username=${githubUsername}`;
        // Fallback: list public repos if pinned API fails
        const publicReposApiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc&per_page=6`;


        try {
            let repos = [];
            try {
                const response = await fetch(pinnedApiUrl);
                if (!response.ok) throw new Error('Pinned repos API failed, trying fallback.');
                repos = await response.json();
                if (repos.length === 0) throw new Error('No pinned repos found via API, trying fallback.');

            } catch (error) {
                console.warn(error.message);
                const fallbackResponse = await fetch(publicReposApiUrl);
                if (!fallbackResponse.ok) throw new Error('Fallback public repos API also failed.');
                let publicRepos = await fallbackResponse.json();
                // Simulate "pinned" by taking the top 6 by some metric or just the latest.
                // For this example, we'll just take the first 6 latest updated.
                repos = publicRepos.slice(0, 6).map(repo => ({
                    repo: repo.name,
                    owner: repo.owner.login,
                    description: repo.description,
                    language: repo.language,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    link: repo.html_url
                }));
            }

            if (!repos || repos.length === 0) {
                projectsGrid.innerHTML = '<p>Could not fetch projects. Please try again later.</p>';
                return;
            }

            projectsGrid.innerHTML = ''; // Clear loading message

            repos.forEach(repo => {
                const projectCard = `
                    <div class="project-card">
                        <h3><a href="${repo.link}" target="_blank" rel="noopener noreferrer">${repo.owner}/${repo.repo}</a></h3>
                        <p>${repo.description || 'No description available.'}</p>
                        <div class="project-tags">
                            ${repo.language ? `<span class="tag">${repo.language}</span>` : ''}
                            <span class="tag">⭐ ${repo.stars || 0}</span>
                            <span class="tag"> Forks: ${repo.forks || 0}</span>
                        </div>
                        <a href="${repo.link}" target="_blank" rel="noopener noreferrer" class="btn project-link">View Project</a>
                    </div>
                `;
                projectsGrid.insertAdjacentHTML('beforeend', projectCard);
            });

        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            if (projectsGrid) {
                projectsGrid.innerHTML = '<p>Error loading projects. Please check the console for details.</p>';
            }
        }
    }

    if (document.getElementById('projects')) { // Only fetch if the projects section exists
        fetchPinnedRepos();
    }

    // Contact Form Status Handling (via PHP session messages)
    const formStatusMessage = document.getElementById('form-status-message');
    const contactForm = document.getElementById('contact-form');

    // Check if a status message is set in the URL (e.g. by PHP redirect with session)
    // This part is mostly for displaying messages set by PHP after a redirect.
    // The PHP script now uses sessions and redirects.
    // We need a small piece of JS to display these session-based messages if the div exists.

    // The PHP script redirects back to index.html#contact.
    // We'll add a bit of script to index.html itself to display session messages,
    // as script.js might load too late or it's cleaner to handle it directly where PHP can inject.
    // For now, if a message div is present and has content (e.g. from a previous failed AJAX attempt,
    // or if we manually inject via URL params - which we are not doing with sessions), this would show it.
    // The current PHP implementation relies on page reload and PHP echoing the message.
    // Let's adjust the plan to modify index.html to display PHP session messages.

    // If we were to use AJAX submission (which is more modern but not explicitly requested for this PHP part):
    /*
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const action = this.getAttribute('action');

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData
                });
                const resultText = await response.text(); // Or response.json() if PHP returns JSON

                if (formStatusMessage) {
                    // This part needs careful implementation based on what PHP returns.
                    // For simplicity, the current PHP script redirects.
                    // If it returned JSON:
                    // const result = JSON.parse(resultText);
                    // formStatusMessage.textContent = result.message;
                    // formStatusMessage.className = result.status === 'success' ? 'success' : 'error';
                    // if (result.status === 'success') {
                    //     contactForm.reset();
                    // }

                    // For now, since PHP redirects, this specific AJAX handler is not fully utilized.
                    // We'll rely on PHP to set session messages and display them on page load.
                    // This block is a placeholder for a future AJAX enhancement.
                    formStatusMessage.textContent = "Processing via AJAX (not fully implemented for redirect flow)...";
                    formStatusMessage.className = "";

                }
            } catch (error) {
                if (formStatusMessage) {
                    formStatusMessage.textContent = 'An error occurred while submitting the form.';
                    formStatusMessage.className = 'error';
                }
                console.error('Form submission error:', error);
            }
        });
    }
    */
    // The current PHP script uses sessions and redirects.
    // The display of these messages will be handled by adding a small PHP snippet in index.html's contact section.

});
