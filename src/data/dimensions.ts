/**
 * PBTI 维度体系
 * 参考 SBTI 的 5模型×3子维度=15维度 架构
 * 每维度 L/M/H 三档
 */

export interface DimensionDef {
  code: string;
  name: string;
  model: string;
  modelName: string;
  levels: {
    L: string;
    M: string;
    H: string;
  };
}

export const dimensionDefs: DimensionDef[] = [
  // ===== 代码信仰模型 (Code Faith) =====
  {
    code: "C1",
    name: "代码洁癖度",
    model: "C",
    modelName: "Coding习惯度",
    levels: {
      L: "代码能跑就行，变量名 a b c 是对ASCII的尊重",
      M: "平时算讲究，任务要截止了允许自己放纵",
      H: "一个空格都不能错位，Prettier 是我的信仰",
    },
  },
  {
    code: "C2",
    name: "技术债态度",
    model: "C",
    modelName: "Coding习惯度",
    levels: {
      L: "技术债这话说的？代码就没打算有人维护",
      M: "知道技术债，TODO 写了一堆，但永远排不上",
      H: "每个迭代留时间还债，甚至主动重构祖传代码",
    },
  },
  {
    code: "C3",
    name: "工程素养",
    model: "C",
    modelName: "Coding习惯度",
    levels: {
      L: "git commit -m '.'，和Git的关系就到这了",
      M: "大部分时候规范，偶尔 force push 一下也不是不行",
      H: "CI/CD、Code Review、单测覆盖率，一个都不能少",
    },
  },

  // ===== Bug应对模型 (Bug Response) =====
  {
    code: "B1",
    name: "Bug归因",
    model: "B",
    modelName: "Bug应对",
    levels: {
      L: "Not My Bad，是框架的问题 / 环境的锅 ",
      M: "先排查自己的，但也不排除是别人的问题",
      H: "默认是自己的Bug，debug到天荒地老也要找到",
    },
  },
  {
    code: "B2",
    name: "抗压能力",
    model: "B",
    modelName: "Bug应对",
    levels: {
      L: "报错？关掉预警就没有报错了",
      M: "会紧张但能稳住，先评估影响范围",
      H: "冷静，Calm Down，一边回滚一边找根因",
    },
  },
  {
    code: "B3",
    name: "担当意识",
    model: "B",
    modelName: "Bug应对",
    levels: {
      L: "不是我发的版本，与我无瓜",
      M: "自己的锅自己背，别人的锅看情况帮",
      H: "别人的Bug也帮忙修，毫无怨言",
    },
  },

  // ===== 协作模型 (Team Synergy) =====
  {
    code: "T1",
    name: "沟通风格",
    model: "T",
    modelName: "团队协作",
    levels: {
      L: "你做的真不错啊（YYGQ）",
      M: "委婉提建议，能过就过，大问题再说",
      H: "你这段代码有SEVENTEEN个问题，我逐条写了Review",
    },
  },
  {
    code: "T2",
    name: "协作主动性",
    model: "T",
    modelName: "团队协作",
    levels: {
      L: "Not Found，Vibe Coding中（其实在摸鱼）",
      M: "该配合的配合，但请控制在15分钟内",
      H: "主动拉群对齐、画架构图、写RFC，超级产品经理",
    },
  },
  {
    code: "T3",
    name: "知识分享",
    model: "T",
    modelName: "团队协作",
    levels: {
      L: "甩链接：自己搜",
      M: "简单回答一下，丢几个链接",
      H: "写完整文档、做分享、手把手带新人",
    },
  },

  // ===== 驱动力模型 (Drive Engine) =====
  {
    code: "D1",
    name: "技术热情",
    model: "D",
    modelName: "驱动引擎",
    levels: {
      L: "逼上梁山再学，能不学就不学",
      M: "感兴趣的主动了解，不感兴趣的随缘",
      H: "新框架出来必须第一时间试，GitHub 绿成草原",
    },
  },
  {
    code: "D2",
    name: "内卷指数",
    model: "D",
    modelName: "驱动引擎",
    levels: {
      L: "准点下班，工作群消息已读不回",
      M: "偶尔加班，但周末是底线",
      H: "一大早起来优化那个0.1ms的性能差距",
    },
  },
  {
    code: "D3",
    name: "创造欲",
    model: "D",
    modelName: "驱动引擎",
    levels: {
      L: "Side Project？连 Main Project 都不想做",
      M: "有想法但TODO List里躺了一堆从没开始的",
      H: "已经做了十几个项目，虽然大部分烂尾了",
    },
  },

  // ===== AI人机协作模型 (AI Relationship) =====
  {
    code: "A1",
    name: "AI依赖度",
    model: "A",
    modelName: "AI人机协作度",
    levels: {
      L: "AI？不需要，上古编程才能体现基本功含金量",
      M: "用AI提效但会仔细Review，不做AI的传声筒",
      H: "Codex Tab Tab Tab，AI不动我不动，AI动了我也不一定动",
    },
  },
  {
    code: "A2",
    name: "AI焦虑感",
    model: "A",
    modelName: "AI人机协作度",
    levels: {
      L: "AI替代PM？那就它来替我上班",
      M: "有点焦虑但在努力提升自己的不可替代性",
      H: "已经开始学prompt engineering了，打不过就加入",
    },
  },
  {
    code: "A3",
    name: "技术信仰",
    model: "A",
    modelName: "AI人机协作度",
    levels: {
      L: "Vibe Coding 就完了，理解代码是上个时代的事",
      M: "AI辅助可以但核心逻辑还是要自己把控",
      H: "基础不能丢，算法、数据结构、系统设计才是根本",
    },
  },
];
