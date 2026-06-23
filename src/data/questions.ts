export interface Question {
  id: number;
  dimension: string;
  text: string;
  options: { value: number; label: string }[];
}

export const questions: Question[] = [
  // ===== C1 代码洁癖度 =====
  { id: 1, dimension: "C1", text: "你在 review 一个核心需求 PR，代码功能正常但变量命名混乱，你会：", options: [
    { value: 1, label: "直接 approve，功能正确最重要" },
    { value: 2, label: "提出命名优化建议，不强制修改" },
    { value: 3, label: "要求必须重构后才能合并" },
  ]},
  { id: 2, dimension: "C1", text: "距离上线只剩2小时，发现前端代码格式混乱但无逻辑问题，你会：", options: [
    { value: 1, label: "能跑就行，直接上线，要什么自行车" },
    { value: 2, label: "让开发简单修一下关键文件，差不多就行" },
    { value: 3, label: "全量 lint + format ，调到完全符合规范，顺便加个rules文件再发布" },
  ]},

  // ===== C2 技术债态度 =====
  { id: 3, dimension: "C2", text: "产品经理要求本迭代必须上线新功能，但你知道会产生技术债，你会：", options: [
    { value: 1, label: "先上线，技术债以后再说" },
    { value: 2, label: "写 TODO 并记录风险" },
    { value: 3, label: "主动推动拆分架构或延迟上线" },
  ]},
  { id: 4, dimension: "C2", text: "你接手一个高风险模块，代码混乱但影响业务，你会：", options: [
    { value: 1, label: "能跑就别动" },
    { value: 2, label: "边修边记录问题" },
    { value: 3, label: "优先重构核心架构再继续迭代" },
  ]},

  // ===== C3 工程素养 =====
  { id: 5, dimension: "C3", text: "你提交代码习惯是：", options: [
    { value: 1, label: "git commit -m ‘fix’" },
    { value: 2, label: "基本遵守规范，偶尔简化" },
    { value: 3, label: "严格遵循 commit / review / CI 流程" },
  ]},
  { id: 6, dimension: "C3", text: "线上报错后你第一步会：", options: [
    { value: 1, label: "先改代码再说" },
    { value: 2, label: "查日志 + 判断影响面" },
    { value: 3, label: "回滚 + 定位 + 补单测 + 复盘" },
  ]},

  // ===== B1 Bug归因 =====
  { id: 7, dimension: "B1", text: "发现线上问题时你倾向：", options: [
    { value: 1, label: "是框架或环境的锅，与我无瓜" },
    { value: 2, label: "双向排查自己和外部，行吧让我看看" },
    { value: 3, label: "默认自己有问题直到证实不是" },
  ]},
  { id: 8, dimension: "B1", text: "Bug修复后你通常：", options: [
    { value: 1, label: "修完就结束" },
    { value: 2, label: "简单记录原因" },
    { value: 3, label: "写完整 postmortem + 改流程" },
  ]},

  // ===== B2 抗压能力 =====
  { id: 9, dimension: "B2", text: "周五5:59群里弹消息：线上炸了。你会？", options: [
    { value: 1, label: "假装没看到，手机静音，等上班再说" },
    { value: 2, label: "先看看严重不严重" },
    { value: 3, label: "秒回「我看看」，打开监控面板并跟进恢复" },
  ]},
  { id: 10, dimension: "B2", text: "服务异常扩大时，你：", options: [
    { value: 1, label: "有点慌" },
    { value: 2, label: "Calm Down并协调" },
    { value: 3, label: "拆链路逐层恢复系统" },
  ]},

  // ===== B3 担当意识 =====
  { id: 11, dimension: "B3", text: "不是你负责的系统出问题：", options: [
    { value: 1, label: "不是我的任务=不是我的锅" },
    { value: 2, label: "看情况，紧急就帮看看，不急就算" },
    { value: 3, label: "主动介入排查" },
  ]},
  { id: 12, dimension: "B3", text: "多个团队互相甩锅时，你：", options: [
    { value: 1, label: "不介入，远离是非" },
    { value: 2, label: "协调沟通，客观分析" },
    { value: 3, label: "主动写根因分析+改进方案+推动问题闭环" },
  ]},

  // ===== T1 沟通风格 =====
  { id: 13, dimension: "T1", text: "你在 review 中会：", options: [
    { value: 1, label: "‘OK’" },
    { value: 2, label: "提一些建议顺便加个善良的emoji" },
    { value: 3, label: "逐条 detail review 并解释原因" },
  ]},
  { id: 14, dimension: "T1", text: "当你不同意方案时：", options: [
    { value: 1, label: "沉默是今晚的康桥" },
    { value: 2, label: "委婉表达，某方面有难度，换个方案？" },
    { value: 3, label: "不行，原因如下，直接拉会找替代方案" },
  ]},

  // ===== T2 协作主动性 =====
  { id: 15, dimension: "T2", text: "需求卡住时，你：", options: [
    { value: 1, label: "等别人推进" },
    { value: 2, label: "被动参与" },
    { value: 3, label: "主动拆解问题推动解决" },
  ]},
  { id: 16, dimension: "T2", text: "跨部门项目中你：", options: [
    { value: 1, label: "一键跟随" },
    { value: 2, label: "参与会议" },
    { value: 3, label: "主导对齐机制，修改文档" },
  ]},

  // ===== T3 知识分享 =====
  { id: 17, dimension: "T3", text: "实习生or新人问你问题，你会：", options: [
    { value: 1, label: "哎一古自己查文档啦BB" },
    { value: 2, label: "简单说两句，推荐几个文档和链接" },
    { value: 3, label: "拿白板或文档从头讲起，从头带小孩" },
  ]},
  { id: 18, dimension: "T3", text: "你在团队中：", options: [
    { value: 1, label: "不太分享" },
    { value: 2, label: "有意思的东西偶尔分享" },
    { value: 3, label: "持续输出文档/培训，分享快乐又焦虑" },
  ]},

  // ===== D1 技术热情 =====
  { id: 19, dimension: "D1", text: "你参与开源情况：", options: [
    { value: 1, label: "不参与，没什么意义" },
    { value: 2, label: "偶尔，还是很有成就感的" },
    { value: 3, label: "经常复现/贡献" },
  ]},
  { id: 20, dimension: "D1", text: "Claude/GPT/DeepSeek又发新模型了", options: [
    { value: 1, label: "又来？能替我上班吗" },
    { value: 2, label: "先看看大家的体感和评测" },
    { value: 3, label: "秒申请API Key，跑benchmark写体验报告" },
  ]},

  // ===== D2 内卷指数 =====
  { id: 21, dimension: "D2", text: "周末你最可能在干嘛？", options: [
    { value: 1, label: "睡觉刷视频，项目等工作日再说" },
    { value: 2, label: "偶尔看看开源社区和技术文章，主要休息" },
    { value: 3, label: "写PRD /主动优化 " },
  ]},
  { id: 22, dimension: "D2", text: "面对性能问题：", options: [
    { value: 1, label: "能用就行了" },
    { value: 2, label: "合理优化" },
    { value: 3, label: "追求极致地优化每个细节" },
  ]},

  // ===== D3 创造欲 =====
  { id: 23, dimension: "D3", text: "side project：", options: [
    { value: 1, label: "没做过" },
    { value: 2, label: "想做但没做" },
    { value: 3, label: "做过挺多个的（部分烂尾）" },
  ]},
  { id: 24, dimension: "D3", text: "你的日常belike：", options: [
    { value: 1, label: "很少想idea" },
    { value: 2, label: "偶尔想idea" },
    { value: 3, label: "经常尝试实现" },
  ]},

  // ===== A1 AI依赖度 =====
  { id: 25, dimension: "A1", text: "你写代码时，AI扮演什么角色？", options: [
    { value: 1, label: "不用，手写古法编程才能体现基本功含金量" },
    { value: 2, label: "辅助提效，但每行都Review" },
    { value: 3, label: "Tab Tab Accept，AI不动我不动，AI动了我也不一定动" },
  ]},
  { id: 26, dimension: "A1", text: "AI一次生成了几百行代码，你？", options: [
    { value: 1, label: "不信它" },
    { value: 2, label: "逐行Review，改完再用" },
    { value: 3, label: "先跑跑看，能过测试就直接用" },
  ]},

  // ===== A2 AI焦虑感 =====
  { id: 27, dimension: "A2", text: "「AI即将取代PM」你听了之后？", options: [
    { value: 1, label: "快来替我上班！迫不及待被取代" },
    { value: 2, label: "有点焦虑，正在提升自己的不可替代性" },
    { value: 3, label: "在学AI Agent甚至全栈开发了，打不过就加入" },
  ]},
  { id: 28, dimension: "A2", text: "面对新出现的各种AI工具，你：", options: [
    { value: 1, label: "不用，未必有手头上那几个老工具经典实用" },
    { value: 2, label: "逐步适应，探索新的工具和方法" },
    { value: 3, label: "主动拥抱，尝试更新自己的工具库" },
  ]},

  // ===== A3 技术信仰 =====
  { id: 29, dimension: "A3", text: "关于Vibe Coding：", options: [
    { value: 1, label: "未来大势，理解代码已经OUT了" },
    { value: 2, label: "原型验证可以，生产代码还得严谨" },
    { value: 3, label: "不懂原理还是海市蜃楼" },
  ]},
  { id: 30, dimension: "A3", text: "「AI时代不用学算法了」，你觉得？", options: [
    { value: 1, label: "确实，让AI写就行" },
    { value: 2, label: "基础还得懂，但不用死记硬背了" },
    { value: 3, label: "NONONO，不懂算法你连AI写的对不对都不知道" },
  ]},
];

export const hiddenQuestions = [
  {
    id: 31,
    text: "答完啦！最后一个不计分：你桌上现在放着啥饮料？",
    options: [
      { value: "water", label: "白开水" },
      { value: "tea", label: "茶" },
      { value: "coffee", label: "咖啡" },
      { value: "milktea", label: "可乐/奶茶" },
    ],
  },
  {
    id: 32,
    text: "一天喝几杯饮料（含茶、咖啡、奶茶）？",
    triggerPrev: "coffee",
    options: [
      { value: "casual", label: "一杯就够" },
      { value: "addict", label: "三杯起步，没这些就不能开机" },
    ],
  },
];
