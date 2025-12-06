# Spring Couplet AI | 智创春联 🧧

一个基于React的智能春联生成应用，使用大语言模型根据中文姓名自动创作个性化藏头春联，融合传统文化与现代AI技术。

![风格](https://img.shields.io/badge/风格-中国风-red?style=flat-square)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ 功能亮点

### 🎯 核心功能
- **智能姓名解析**：自动识别单姓/复姓，精准拆分姓名结构
- **藏头春联创作**：根据姓名各部分生成符合格律的七言春联
- **传统格式展示**：垂直书写、红纸金字的经典春联样式
- **多场景适配**：支持不同姓名长度和结构的智能处理

### 🎨 设计特色
- **中国风UI**：红色主题、传统纹样、动态粒子效果
- **响应式布局**：适配桌面和移动设备
- **平滑动画**：CSS过渡和关键帧动画增强体验
- **真实质感**：模拟宣纸、红绸、金属配件的视觉效果

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| **React 19** | 前端框架，使用最新特性 |
| **TypeScript** | 类型安全，更好的开发体验 |
| **Tailwind CSS** | 实用优先的CSS框架 |

## 🚀 快速开始

### 环境要求
- Node.js 16+ 
- pnpm 或 npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/GymBag114/spring-couplet-ai.git
cd spring-couplet-ai
```

2. **安装依赖**
```bash
pnpm install
# 或
npm install
# 或
yarn install
```

3. **配置环境变量**
创建 `.env.local` 文件：
```env
VITE_API_KEY=your-api-key
VITE_API_BASE_URL=https://api.deepseek.com
VITE_API_MODEL=deepseek-chat
```
您也同样可以使用项目自带的图形化配置界面配置这一切。

4. **运行开发服务器**
```bash
pnpm run dev
# 或
npm run dev
# 或
yarn dev
```

5. **访问应用**
打开浏览器访问 `http://localhost:3000`

## ⚙️ 配置说明

### API设置
点击右上角设置图标(⚙️)配置：
- **API KEY**：API密钥（必需）
- **API ADDRESS**：默认为DeepSeek API，支持自定义端点
- **MODEL NAME**：默认为`deepseek-chat`

> 💡 **注意**：配置信息仅存储在浏览器本地，不会上传到服务器

## 🔧 构建与部署

### 开发模式
```bash
pnpm run dev
```

### 生产构建
```bash
pnpm run build
```

构建产物位于 `dist/` 目录

### 预览构建结果
```bash
pnpm run preview
```
### 部署到Github Pages（可选）
```bash
pnpm run deploy
```

## 🤖 AI工作原理

### 处理流程
```
输入姓名 → AI姓名解析 → 春联创作 → 格式渲染 → 展示结果
```

### 提示词设计
1. **姓名解析提示词**：严格按中文姓名规则拆分
2. **春联创作提示词**：要求符合平仄、对仗、藏头规则
3. **输出格式**：强制JSON结构，确保数据一致性

### 错误处理
- 无效姓名 → 友好提示重新输入
- 其他语言 → 友好提示输入中文

## 🎨 设计理念

### 视觉设计
- **色彩**：中国红为主色调，金色点缀
- **字体**：书法字体，传统韵味
- **布局**：对称平衡，符合传统审美
- **动效**：粒子浮动、缩放过渡，增强节日氛围

### 用户体验
- **引导明确**：清晰的输入提示
- **反馈及时**：加载状态、成功提示
- **操作简单**：一键生成、界面美观
- **移动友好**：触屏优化，响应式设计

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- **Lucide**：提供精美的开源图标
- **Tailwind CSS**：高效的样式开发体验
- **React团队**：优秀的前端框架

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- **GitHub Issues**：[报告问题](https://github.com/GymBag114/spring-couplet-ai/issues)

---

**愿您新年福气满满，春联创作愉快！🎉**