# GitHub Trends Skill

获取 GitHub 热门仓库信息，支持按时间范围和编程语言筛选。

## Installation

```bash
npm install
```

## Usage

### 启动服务

```bash
npm start
```

服务将在 http://localhost:3000 启动

### API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/` | GET | 健康检查 |
| `/health` | GET | 服务状态 |
| `/execute` | POST | 执行 skill |

### 调用示例

```bash
curl -X POST http://localhost:3000/execute \
  -H "Content-Type: application/json" \
  -d '{"timeFrame":"weekly","limit":10,"language":"python"}'
```

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| timeFrame | string | 'weekly' | daily/weekly/monthly |
| limit | number | 10 | 返回数量 |
| language | string | - | 编程语言筛选 |

## 部署到 OpenClaw

1. 启动服务: `npm start`
2. 在 OpenClaw 平台配置工具地址: `http://localhost:3000/execute`
