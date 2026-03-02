import express from 'express';
import cors from 'cors';
import { execute, SkillInput } from './index';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'GitHub Trends Skill',
    version: '2.0.0',
    description: '获取 GitHub 热门仓库信息',
    endpoints: {
      'GET /': '健康检查',
      'POST /execute': '执行 skill',
    },
    example: {
      input: { timeFrame: 'weekly', limit: 10, language: 'python' },
    },
  });
});

app.post('/execute', async (req, res) => {
  try {
    const input: SkillInput = req.body;
    const result = await execute(input);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: { count: 0, timeFrame: 'unknown', repositories: [] },
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 GitHub Trends Skill 服务已启动: http://localhost:${PORT}`);
  console.log(`📡 端点: POST http://localhost:${PORT}/execute`);
});

export default app;
