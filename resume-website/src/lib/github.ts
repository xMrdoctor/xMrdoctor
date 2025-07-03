import { GitHubRepo, Project } from "./utils";

const GITHUB_USERNAME = "xMrDoctor";
const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN; // Recommended for higher rate limits

interface RepoLanguageData {
  [language: string]: number;
}

export async function getGithubProjects(): Promise<Project[]> {
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=10&type=owner`;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (GITHUB_API_TOKEN) {
    headers["Authorization"] = `token ${GITHUB_API_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      // You could throw an error here or return a default/empty list
      // For now, returning an empty list on error to prevent build failure
      // throw new Error(`Failed to fetch projects: ${response.statusText}`);
      return [];
    }

    const repos = (await response.json()) as GitHubRepo[];

    // Filter out forks if desired, and map to Project structure
    const projects: Project[] = repos
      // .filter(repo => !repo.fork) // Uncomment to filter out forked repositories
      .map((repo) => ({
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language, // Primary language
        updated_at: repo.updated_at,
        created_at: repo.created_at,
        pushed_at: repo.pushed_at,
        homepage: repo.homepage,
        topics: repo.topics || [],
      }));

    return projects.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()).slice(0, 6); // Return top 6 recently pushed
  } catch (error) {
    console.error("Failed to fetch GitHub projects:", error);
    return []; // Return empty array on error
  }
}

export async function getGithubStats() {
  const userUrl = `https://api.github.com/users/${GITHUB_USERNAME}`;
  const reposUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`; // Get all owned repos

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (GITHUB_API_TOKEN) {
    headers["Authorization"] = `token ${GITHUB_API_TOKEN}`;
  }

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(userUrl, { headers, next: { revalidate: 3600 } }),
      fetch(reposUrl, { headers, next: { revalidate: 3600 } }),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      console.error("GitHub API error for stats");
      if (!userResponse.ok) console.error(`User API: ${userResponse.status} ${userResponse.statusText}`);
      if (!reposResponse.ok) console.error(`Repos API: ${reposResponse.status} ${reposResponse.statusText}`);
      return null;
    }

    const userData = await userResponse.json();
    const reposData = (await reposResponse.json()) as GitHubRepo[];

    let totalStars = 0;
    let totalForks = 0;
    const languages: RepoLanguageData = {};
    let totalCommits = 0; // Note: Accurate total commits requires more API calls or GraphQL

    reposData.forEach(repo => {
      if (!repo.fork) { // Exclude forks from stats aggregation
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      }
    });

    // For total commits, this is a simplified approach.
    // A more accurate way is to sum commits for each repo, which can be API intensive with REST.
    // Or use the GitHub GraphQL API.
    // As a placeholder, we can use the number of public repos.
    // Or, if we want commits, we'd iterate through repos and fetch commit activity.
    // For now, let's fetch contributions using an unofficial API or rely on what's available.

    // Using an external service for contribution graph data as GitHub API for this is complex
    const contributionChartUrl = `https://ghchart.rshah.org/${GITHUB_USERNAME}`;


    return {
      username: userData.login,
      avatarUrl: userData.avatar_url,
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars,
      totalForks,
      languages: Object.entries(languages).sort(([,a],[,b]) => b-a).reduce((r, [k, v]) => ({ ...r, [k]: v }), {}),
      contributionChartUrl,
      // totalCommits: userData.public_gists // This is not commits, just an example of another stat.
      // To get total commits, you would need to iterate through repos and sum their commits.
      // This can be done with additional fetch calls per repo (e.g., /repos/{owner}/{repo}/commits)
      // or more efficiently with the GraphQL API.
    };

  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
    return null;
  }
}

// Example of fetching languages for a specific repo (can be intensive if done for all)
export async function getRepoLanguages(repoName: string): Promise<RepoLanguageData | null> {
  const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (GITHUB_API_TOKEN) {
    headers["Authorization"] = `token ${GITHUB_API_TOKEN}`;
  }

  try {
    const response = await fetch(url, { headers, next: { revalidate: 3600 } });
    if (!response.ok) {
      console.error(`GitHub API error for repo languages: ${response.status} ${response.statusText}`);
      return null;
    }
    return (await response.json()) as RepoLanguageData;
  } catch (error) {
    console.error(`Failed to fetch languages for repo ${repoName}:`, error);
    return null;
  }
}
