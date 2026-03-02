# GitHub Trends Skill

## Metadata
- **Name:** GitHub Trends
- **Description:** 获取 GitHub 热门仓库信息，包括 stars、forks、项目描述、标签等
- **Integration:** OpenClaw
- **Version:** 2.0.0
- **Author:** asxzsa558

## Skill Interface

### Input
```typescript
interface SkillInput {
  timeFrame?: 'daily' | 'weekly' | 'monthly';  // 时间范围，默认 weekly
  limit?: number;                                // 返回数量，默认 10
  language?: string;                             // 编程语言筛选，如 python, rust
}
```

### Output
```typescript
interface SkillOutput {
  success: boolean;
  message: string;
  data: {
    count: number;
    timeFrame: string;
    repositories: Repository[];
  };
}
```

## Usage

### 作为模块导入
```typescript
import { execute } from './index';

const result = await execute({
  timeFrame: 'weekly',
  limit: 10,
  language: 'python'
});

console.log(result);
```

### 命令行运行
```bash
npm start
```

## Sample Commands
- "获取本周 Python 热门项目"
- "显示今天的 GitHub trending"
- "本月最火的 Rust 项目有哪些？"

## 功能
- 查询 GitHub 热门仓库
- 支持按时间范围筛选（每日/每周/每月）
- 支持按编程语言筛选
- 返回完整的仓库元数据
