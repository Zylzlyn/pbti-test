# PBTI — 程序员行为类型测试

> Product Behavior Type Indicator
>
> 测出你的产品人格。

## 在线体验

👉 [点击开始测试](https://pbti.zylzlyn.cn)

## 项目简介

PBTI 是一个面向产品经理群体的趣味人格测试网站，灵感来自 MBTI 。

通过 30 道和产品人日常相关的选择题，从 **5 大行为模型、15 个维度** 综合分析，匹配出你的编程人格类型。

共有 **27 种普通人格 + 1 种隐藏人格**，每种人格都用一个程序员都懂的关键词命名（如 `SUDO`、`NULL`、`CTRL-C`、`996`、`VIBE`），配有专属人物形象、有趣和分享文案。

## 人格类型一览

| 代码           | 名称           | 一句话                     |
| ------------ | ------------ | ----------------------- |
| SUDO         | 世界观权限者       | 这事不确定？我直接处理             |
| README       | 文档预言家        | 问什么问？看文档                |
| COMMIT       | 提交信徒         | 不管了，先提交再说               |
| CRUD         | 增删改查ER       | 需求再复杂，本质都是CRUD          |
| BUG-0        | 零Bug信仰者      | Bug？不存在的                |
| 404          | 隐身产品人        | 潜水中，已读不回                |
| VIBE         | Vibe Coder   | 一行代码都不写，交给AI自己弄         |
| LGTM         | 共识推动者        | LGTM 👍                 |
| NPM-i        | 组件收藏家        | npm install everything. |
| DELETE       | 无情优化者        | rm -rf                  |
| FIXME        | 救火的铁T        | TODO: fix this later    |
| HACK         | 野路子产品工程师     | 哎一古能用就行                 |
| CTRL-C       | 复制粘贴大师       | 别管了先弄个能跑的版本             |
| RUSH         | 极限速通PM       | 再难的Part也得速通             |
| RTFM         | 文档教条主义者      | 看了文档再说                  |
| //TODO       | 下次一定         | // TODO: 下次一定再优化        |
| 996          | Overachiever | 你结束了？我再看看               |
| GOTO         | 皇帝           | 我的世界和规则我说了算             |
| PING         | 人脉收割机        | ping你一下，人脉拿来            |
| NULL         | 空状态哲学家       | NullPointerException    |
| SENIOR       | 面试幻觉大师       | 面试造火箭，入职标数据             |
| YAML         | 配置工程师        | 不写代码，写配置文件              |
| STACK        | 底层原理化身       | 所有问题都能讲回JVM             |
| SLEEP        | 延迟觉醒者        | 就这样等截止时间                |
| FORK         | 开源圣体         | 不要star，要PR              |
| AGILE        | 敏捷话术师        | 来做一个retro               |
| REGEX        | 正则Master     | 匹配失败                    |
| ☕ PM Running | 提神驱动开发者      | 隐藏人格                    |

## 维度体系

**5 个行为模型 × 3 个子维度 = 15 个评估维度**，每个维度 L/M/H 三档。

| 模型            | 子维度                           |
| ------------- | ----------------------------- |
| 💻 Coding 习惯度 | C1 代码洁癖度 · C2 技术债态度 · C3 工程素养 |
| 🐛 Bug应对      | B1 Bug归因 · B2 抗压能力 · B3 担当意识  |
| 🤝 团队协作       | T1 沟通风格 · T2 协作主动性 · T3 知识分享  |
| 🚀 驱动引擎       | D1 技术热情 · D2 内卷指数 · D3 创造欲    |
| 🤖 AI共处       | A1 AI依赖度 · A2 AI焦虑感 · A3 技术信仰 |

## 匹配算法

1. 每道题 1/2/3 分，每维度 2 题，分值范围 2-6
2. 分数转等级：≤3 → L，4 → M，≥5 → H
3. 15 维度等级转为数值向量（L=0, M=1, H=2）
4. 与 27 种人格的标准向量计算**曼哈顿距离**
5. 距离最小者为匹配人格，同时计算匹配度百分比

## 技术栈

- **框架**：Next.js 16 + TypeScript
- **样式**：Tailwind CSS 4
- **部署**：EdgeOne Pages（静态导出）
- **图片**：28 张手绘人物形象（PNG，透明背景）
- 纯前端计算，无后端依赖，无数据收集

## 项目结构

```
src/
├── app/
│   ├── page.tsx          # 首页
│   ├── test/page.tsx     # 答题页
│   ├── result/page.tsx   # 结果页
│   ├── types/page.tsx    # 全部人格浏览
│   ├── layout.tsx        # 根布局
│   └── globals.css       # 全局样式
├── components/
│   ├── CharacterSVG.tsx  # 人物形象组件
│   ├── MountainScene.tsx # 首页山景背景
│   └── RadarChart.tsx    # 五维雷达图
├── data/
│   ├── questions.ts      # 30 道题目
│   ├── personalities.ts  # 27+1 种人格定义
│   └── dimensions.ts     # 15 维度定义
├── lib/
│   └── scoring.ts        # 计分和匹配算法
public/
└── characters/           # 28 张人物形象图
scripts/
└── split_characters.py   # 图片切割脚本
```

## 本地开发

```bash
npm install
npm run dev        # 启动开发服务器 http://localhost:3000
npm run build      # 构建（静态导出到 out/）
```

## 部署

项目配置了 `output: "export"`，构建后生成纯静态文件，可部署到任意静态托管平台：

```bash
npm run build
# 将 out/ 目录部署到 EdgeOne Pages / Vercel / Netlify / Cloudflare Pages 等
```

