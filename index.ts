import axios from 'axios';

const GITHUB_TRENDING_URL = 'https://gh-trending-api.herokuapp.com/repositories';
const TIME_FRAME = 'daily'; // You can use 'weekly' or 'monthly' as well.

interface Repository {
    name: string;
    author: string;
    stars: number;
    forks: number;
    language: string;
}

async function fetchTrendingRepositories(): Promise<Repository[]> {
    try {
        const response = await axios.get(`${GITHUB_TRENDING_URL}?time_frame=${TIME_FRAME}`);
        return response.data.map((repo: any) => ({
            name: repo.name,
            author: repo.author,
            stars: repo.stars,
            forks: repo.forks,
            language: repo.language,
        }));
    } catch (error) {
        console.error('Error fetching trending repositories:', error);
        return [];
    }
}

async function analyzeRepositories(repos: Repository[]): Promise<void> {
    console.log(`Found ${repos.length} trending repositories.`);
    repos.forEach(repo => {
        console.log(`Repository ${repo.name} by ${repo.author}: ${repo.stars} stars, ${repo.forks} forks, Language: ${repo.language}`);
    });
}

(async () => {
    const trendingRepos = await fetchTrendingRepositories();
    await analyzeRepositories(trendingRepos);
})();
