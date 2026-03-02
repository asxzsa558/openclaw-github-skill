import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/search/repositories';

export interface SkillInput {
  timeFrame?: 'daily' | 'weekly' | 'monthly';
  limit?: number;
  language?: string;
}

export interface Repository {
  name: string;
  author: string;
  description: string;
  topics: string[];
  stars: number;
  forks: number;
  watchers: number;
  language: string;
  license: string;
  updatedAt: string;
  url: string;
}

export interface SkillOutput {
  success: boolean;
  message: string;
  data: {
    count: number;
    timeFrame: string;
    repositories: Repository[];
  };
}

async function fetchTrendingRepositories(timeFrame: string = 'weekly', limit: number = 10, language?: string): Promise<Repository[]> {
  try {
    const today = new Date();
    const startDate = new Date(today);
    
    switch (timeFrame) {
      case 'daily':
        startDate.setDate(today.getDate() - 1);
        break;
      case 'weekly':
        startDate.setDate(today.getDate() - 7);
        break;
      case 'monthly':
        startDate.setMonth(today.getMonth() - 1);
        break;
      default:
        startDate.setDate(today.getDate() - 7);
    }
    
    const created = startDate.toISOString().split('T')[0];
    let query = `created:>${created}`;
    
    if (language) {
      query += `+language:${language}`;
    }
    
    const response = await axios.get(
      `${GITHUB_API_URL}?q=${query}&sort=stars&order=desc&per_page=${limit}`,
      { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    );
    
    return response.data.items.map((repo: any) => ({
      name: repo.name,
      author: repo.owner.login,
      description: repo.description || 'No description',
      topics: repo.topics || [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      language: repo.language || 'Unknown',
      license: repo.license?.spdx_id || 'No license',
      updatedAt: repo.updated_at,
      url: repo.html_url,
    }));
  } catch (error: any) {
    throw new Error(`Failed to fetch trending repositories: ${error.message}`);
  }
}

export async function execute(input: SkillInput): Promise<SkillOutput> {
  const timeFrame = input.timeFrame || 'weekly';
  const limit = input.limit || 10;
  const language = input.language;
  
  try {
    const repositories = await fetchTrendingRepositories(timeFrame, limit, language);
    
    return {
      success: true,
      message: `Successfully fetched ${repositories.length} trending repositories`,
      data: {
        count: repositories.length,
        timeFrame,
        repositories,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: {
        count: 0,
        timeFrame,
        repositories: [],
      },
    };
  }
}

if (require.main === module) {
  (async () => {
    const result = await execute({ timeFrame: 'weekly', limit: 10 });
    console.log(JSON.stringify(result, null, 2));
  })();
}
