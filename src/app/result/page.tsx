"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { calculateResult, type TestResult } from "@/lib/scoring";
import { getSiteUrl } from "@/lib/constants";
import CharacterSVG from "@/components/CharacterSVG";
import RadarChart from "@/components/RadarChart";

const modelInfo: Record<string, { icon: string; name: string }> = {
  C: { icon: "💻", name: "Coding习惯度" },
  B: { icon: "🐛", name: "Bug应对" },
  T: { icon: "🤝", name: "团队协作" },
  D: { icon: "🚀", name: "驱动引擎" },
  A: { icon: "🤖", name: "AI人机协作度" },
};

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<TestResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [generatingPoster, setGeneratingPoster] = useState(false);
  const [aiText, setAiText] = useState<string | null>(null);
  const [generatingAi, setGeneratingAi] = useState(false);
  const [useAiText, setUseAiText] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("pbti_data");
      if (!raw) { router.push("/"); return; }
      setResult(calculateResult(JSON.parse(raw).answers, JSON.parse(raw).hidden));
    } catch { router.push("/"); }
  }, [router]);

  const generatePoster = useCallback(async () => {
    if (!result || generatingPoster) return;
    setGeneratingPoster(true);
    const p = result.personality;

    const S = 3;
    const W = 750 * S, H = 1334 * S;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    const f = (v: number) => v * S;

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#F7CAC9");
    bg.addColorStop(1, "#F5D5D8");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const bar = ctx.createLinearGradient(0, 0, W, 0);
    bar.addColorStop(0, "#92A8D1");
    bar.addColorStop(1, "#B8C9E8");
    ctx.fillStyle = bar;
    ctx.fillRect(0, 0, W, f(8));

    ctx.textAlign = "center";
    ctx.fillStyle = "#92A8D1";
    ctx.font = `900 ${f(28)}px system-ui, sans-serif`;
    ctx.fillText("PBTI · 产品行为类型测试", W / 2, f(55));

    try {
      const charImg = new Image();
      charImg.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        charImg.onload = () => resolve();
        charImg.onerror = () => reject();
        const code = p.code === "//TODO" ? "TODO" : p.code === "☕ PM Running" ? "JAVA" : p.code;
        charImg.src = `/characters/${code}.png`;
      });
      const imgH = f(300);
      const imgW = imgH * (charImg.width / charImg.height);
      ctx.drawImage(charImg, (W - imgW) / 2, f(110), imgW, imgH);
    } catch { /* skip */ }

    ctx.fillStyle = p.color;
    ctx.font = `900 ${f(88)}px ui-monospace, monospace`;
    ctx.fillText(p.code, W / 2, f(475));

    ctx.fillStyle = "#1c1917";
    ctx.font = `900 ${f(44)}px system-ui, sans-serif`;
    ctx.fillText(p.name, W / 2, f(530));

    ctx.fillStyle = "#78716c";
    ctx.font = `${f(22)}px system-ui, sans-serif`;
    ctx.fillText(`「${p.motto}」`, W / 2, f(570));

    ctx.fillStyle = p.color;
    ctx.font = `900 ${f(64)}px system-ui, sans-serif`;
    ctx.fillText(`${result.similarity}%`, W / 2, f(650));
    ctx.fillStyle = "#a8a29e";
    ctx.font = `${f(20)}px system-ui, sans-serif`;
    ctx.fillText("匹配度", W / 2, f(680));

    ctx.strokeStyle = "#EABFC3";
    ctx.lineWidth = f(2);
    ctx.beginPath();
    ctx.moveTo(f(60), f(710));
    ctx.lineTo(W - f(60), f(710));
    ctx.stroke();

    ctx.fillStyle = "#57534e";
    ctx.font = `${f(21)}px system-ui, sans-serif`;
    ctx.textAlign = "left";
    const maxTW = W - f(120);
    const desc = p.description.slice(0, 180) + (p.description.length > 180 ? "..." : "");
    let line = "";
    let ty = f(750);
    for (const char of desc) {
      const test = line + char;
      if (ctx.measureText(test).width > maxTW) {
        ctx.fillText(line, f(60), ty);
        line = char;
        ty += f(32);
        if (ty > f(900)) { ctx.fillText(line + "...", f(60), ty); line = ""; break; }
      } else { line = test; }
    }
    if (line) ctx.fillText(line, f(60), ty);

    ctx.fillStyle="#E88B92";
    ctx.font = `900 ${f(24)}px system-ui, sans-serif`;
    ctx.fillText("💪 优势", f(60), f(960));
    ctx.fillStyle = "#57534e";
    ctx.font = `${f(20)}px system-ui, sans-serif`;
    p.strengths.forEach((s, i) => {
      ctx.fillText(`✓  ${s}`, f(85), f(995 + i * 34));
    });

    ctx.fillStyle = "#C87A82";
    ctx.font = `900 ${f(24)}px system-ui, sans-serif`;
    ctx.fillText("⚠️ 注意", W / 2 + f(10), f(960));
    ctx.fillStyle = "#57534e";
    ctx.font = `${f(20)}px system-ui, sans-serif`;
    p.weaknesses.forEach((w, i) => {
      ctx.fillText(`!  ${w}`, W / 2 + f(35), f(995 + i * 34));
    });

    const bottomY = f(1110);

    const ctaX = f(60);
    ctx.textAlign = "left";
    ctx.fillStyle = "#1c1917";
    ctx.font = `900 ${f(28)}px system-ui, sans-serif`;
    ctx.fillText("你的PBTI是什么？", ctaX, bottomY + f(50));

    ctx.fillStyle = "#92A8D1";
    ctx.font = `900 ${f(22)}px system-ui, sans-serif`;
    ctx.fillText("访问pbti.zylzlyn.cn", ctaX, bottomY + f(90));

    setPosterUrl(canvas.toDataURL("image/png", 1.0));
    setGeneratingPoster(false);
  }, [result, generatingPoster]);

  const generateAiText = useCallback(async () => {
    if (!result || generatingAi) return;
    setGeneratingAi(true);
    const p = result.personality;
    const siteUrl = getSiteUrl();
    const apiKey = "sk-768348e9af184b1489cf64dd12fe2878";
    const model = "deepseek-chat";

    try {
      const prompt = `你是一个有趣的产品经理人格测试助手。用户测出了【${p.code} · ${p.name}】人格，格言是"${p.motto}"，匹配度${result.similarity}%。

请生成一段适合分享到社交媒体的文案，要求：
1. 保持核心信息：人格代码和名称、格言、匹配度、测试链接 ${siteUrl}
2. 风格活泼有趣，符合产品经理群体，可以适当调侃或自嘲
3. 100字以内
4. 可以加emoji增加趣味性
5. 不要用markdown格式，直接输出纯文本

直接输出文案内容，不要有任何解释或额外说明。`;

      const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: "你是一个有趣的产品经理人格测试助手，擅长生成活泼有趣的社交媒体分享文案。" },
            { role: "user", content: prompt },
          ],
          temperature: 0.8,
          max_tokens: 200,
        }),
      });

      const data = await res.json();
      const generatedText = data.choices?.[0]?.message?.content || "";
      
      if (generatedText) {
        setAiText(generatedText.trim());
        setUseAiText(true);
      }
    } catch (error) {
      console.error("AI生成失败:", error);
    } finally {
      setGeneratingAi(false);
    }
  }, [result, generatingAi]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7CAC9]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#92A8D1] border-t-transparent mx-auto mb-4" />
          <p className="text-stone-400 text-sm">正在编译你的人格类型...</p>
        </div>
      </div>
    );
  }

  const { personality: p, similarity, dimensions: dims, matchDetails } = result;
  const siteUrl = getSiteUrl();
  const defaultShareText = `我在 PBTI 产品人格测试中测出了【${p.code} · ${p.name}】！\n「${p.motto}」\n匹配度 ${similarity}%\n\n你是 VIBE 还是 SLEEP？来测测 👉 ${siteUrl}`;
  const currentShareText = useAiText && aiText ? aiText : defaultShareText;

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(currentShareText); } catch {
      const ta = document.createElement("textarea"); ta.value = currentShareText;
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePoster = () => {
    if (!posterUrl) return;
    const a = document.createElement("a");
    a.href = posterUrl;
    a.download = `PBTI-${p.code}.png`;
    a.click();
  };

  const models = ["C", "B", "T", "D", "A"];

  return (
    <main className="min-h-screen bg-[#F7CAC9]">
      <div className="grain-overlay" />

      {/* 1. 顶部栏 → 宁静蓝纯色 */}
      <header className="sticky top-0 z-50 bg-[#92A8D1] border-b border-[#7B9BC8]/30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="text-white/70 hover:text-white transition text-sm font-medium">← 首页</button>
          {/* 2. PBTI → 流动光粉蓝渐变 */}
          <span className="font-mono font-black text-sm flow-gradient-text">PBTI</span>
          <span className="text-xs text-white/60 font-mono">RESULT</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="slide-up">
          {/* 3. 行为类型卡背景 → 玫瑰石英粉色 */}
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-8 border border-[#EABFC3]/50" style={{ background: `linear-gradient(160deg, #F7CAC940, #F0D0D360, #F7CAC940)` }}>
            <div className="p-10 text-center relative">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`, opacity: 0.3 }} />
              {result.isSpecial && (
                <div className="inline-block bg-[#F0B0B5] text-[#C87A82] text-xs font-black px-4 py-1.5 rounded-lg mb-4">☕ 隐藏人格触发！</div>
              )}
              <div className="float-animation mb-6">
                <CharacterSVG type={p.code} size={170} className="mx-auto" />
              </div>
              <span className="text-5xl md:text-7xl font-black font-mono tracking-wider" style={{ color: p.color }}>{p.code}</span>
              <h1 className="text-2xl font-black text-stone-800 mt-3 mb-2">{p.name}</h1>
              <p className="text-stone-500 italic text-sm mb-6">「{p.motto}」</p>
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-5 py-2.5 rounded-full border border-[#DAE2F0]/50">
                <span className="text-xs text-stone-400">匹配度</span>
                <span className="text-3xl font-black" style={{ color: p.color }}>{similarity}%</span>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur px-8 py-6 border-t border-[#EABFC3]/30">
              <p className="text-stone-600 leading-relaxed text-sm">{p.description}</p>
            </div>
          </div>

          {/* 雷达图 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-[#DAE2F0]/50">
            <h3 className="font-black text-2xl mb-4 text-center flow-gradient-text">五维雷达图</h3>
            <div className="flex justify-center"><RadarChart dimensions={dims} size={480} /></div>
          </div>

          {/* 匹配排行 */}
          {matchDetails.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-[#DAE2F0]/50">
              <h3 className="font-black text-base mb-4 text-stone-700">匹配排行</h3>
              <div className="space-y-2.5">
                {matchDetails.map((m, i) => (
                  <div key={m.code} className="flex items-center gap-3">
                    {/* 7. 序号 → 宁静蓝 */}
                    <span className={`text-xs font-black w-6 h-6 rounded-lg flex items-center justify-center ${i === 0 ? "bg-[#92A8D1] text-white" : "bg-[#DAE2F0] text-[#92A8D1]"}`}>{i + 1}</span>
                    <span className="font-mono text-sm font-bold flex-1 text-stone-700">{m.code} · {m.name}</span>
                    {/* 6. 进度条 → 流动光粉蓝渐变 */}
                    <div className="w-20 h-2 bg-[#F0D0D3] rounded-full overflow-hidden">
                      <div className="h-full rounded-full flow-gradient-bar" style={{ width: `${m.similarity}%` }} />
                    </div>
                    <span className="text-[11px] text-stone-400 w-10 text-right font-mono">{m.similarity}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 十五维度详细解读 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-[#DAE2F0]/50">
            <button onClick={() => setShowDetails(!showDetails)} className="w-full flex items-center justify-between">
              <h3 className="font-black text-base text-stone-700">十五维度详细解读</h3>
              <span className={`text-stone-300 transition-transform text-sm ${showDetails ? "rotate-180" : ""}`}>▼</span>
            </button>
            {showDetails && (
              <div className="mt-6 space-y-8 fade-in">
                {models.map((m) => {
                  const info = modelInfo[m];
                  const modelDims = dims.filter((d) => d.model === m);
                  return (
                    <div key={m}>
                      {/* 4. 维度名称 → 流动光粉蓝渐变 */}
                      <div className="flex items-center gap-2 mb-3"><span className="text-lg">{info.icon}</span><span className="font-black text-sm flow-gradient-text">{info.name}</span></div>
                      <div className="space-y-3 pl-1">
                        {modelDims.map((dim) => (
                          <div key={dim.code} className="border-l-2 border-[#DAE2F0] pl-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-stone-600">{dim.code} {dim.name}</span>
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${dim.level === "H" ? "bg-[#92A8D1] text-white" : dim.level === "M" ? "bg-[#F0D0D3] text-[#C87A82]" : "bg-stone-100 text-stone-400"}`}>{dim.level}</span>
                            </div>
                            {/* 8. 进度条 → 流动光粉蓝渐变 */}
                            <div className="h-1.5 bg-[#F0D0D3] rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-1000 flow-gradient-bar" style={{ width: `${dim.percentage}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 9. 优势和注意 */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-[#DAE2F0]/50">
              <h4 className="font-black text-sm mb-3 text-[#E88B92]">💪 优势</h4>
              <ul className="space-y-2">{p.strengths.map((s, i) => <li key={i} className="text-xs text-stone-600 flex items-start gap-2"><span className="text-[#92A8D1] mt-0.5 font-bold">✓</span>{s}</li>)}</ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-[#DAE2F0]/50">
              <h4 className="font-black text-sm mb-3 text-[#C87A82]">⚠️ 注意</h4>
              <ul className="space-y-2">{p.weaknesses.map((w, i) => <li key={i} className="text-xs text-stone-600 flex items-start gap-2"><span className="text-[#92A8D1] mt-0.5 font-bold">!</span>{w}</li>)}</ul>
            </div>
          </div>

          {/* Tech & Spirit */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-[#DAE2F0]/50">
            <div className="mb-4"><h4 className="font-black text-xs text-stone-400 uppercase tracking-wider mb-1">🛠️ 技术栈</h4><p className="text-sm text-stone-700">{p.techStack}</p></div>
            <div><h4 className="font-black text-xs text-stone-400 uppercase tracking-wider mb-1">💬 灵魂格言</h4><p className="text-sm text-stone-700 italic">「{p.spirit}」</p></div>
          </div>

          {/* 10. 分享板块 → 粉蓝色背景 */}
          <div className="rounded-2xl shadow-2xl p-6 text-center text-white mb-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #92A8D1, #B8C9E8, #F7CAC9)" }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative z-10">
              <h3 className="font-black text-lg mb-2">分享你的PBTI</h3>
              <p className="text-white/60 text-xs mb-4">让更多产品经理发现自己的类型</p>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4 text-left border border-white/10">
                {/* 11. 复制文案字体 → 白色 */}
                <p className="text-sm text-white whitespace-pre-line">{currentShareText}</p>
                {useAiText && aiText && (
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-[10px] text-white/50">✨ AI生成</span>
                    <button onClick={() => setUseAiText(false)} className="text-[10px] text-white/70 underline hover:text-white transition">恢复默认</button>
                  </div>
                )}
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button onClick={handleCopy} className="bg-white px-5 py-2.5 rounded-full font-black text-sm hover:bg-white/90 transition-all active:scale-95 shadow-lg text-[#E88B92]">
                  {copied ? "✓ 已复制！" : "📋 复制文案"}
                </button>
                <button onClick={generateAiText} disabled={generatingAi}
                  className="bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-full font-black text-sm hover:bg-white/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                  {generatingAi ? "生成中..." : aiText ? "🔄 再生成" : "✨ AI生成文案"}
                </button>
                <button onClick={posterUrl ? handleSavePoster : generatePoster}
                  className="bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-full font-black text-sm hover:bg-white/30 transition-all active:scale-95">
                  {generatingPoster ? "生成中..." : posterUrl ? "💾 保存海报" : "🖼️ 生成海报"}
                </button>
              </div>
              {posterUrl && (
                <div className="mt-4 fade-in">
                  <p className="text-white/50 text-[11px] mb-2">长按图片保存到手机</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={posterUrl} alt="分享海报" className="w-full max-w-[320px] mx-auto rounded-xl shadow-lg" />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            {/* 12. 重新测试字体 → 宁静蓝 */}
            <button onClick={() => { sessionStorage.removeItem("pbti_data"); router.push("/test"); }}
              className="flex-1 bg-white text-[#92A8D1] border-2 border-[#92A8D1]/40 px-6 py-3 rounded-full font-black text-sm hover:bg-[#F5F7FA] transition-all">重新测试</button>
            <button onClick={() => router.push("/")}
              className="flex-1 bg-[#92A8D1] text-white px-6 py-3 rounded-full font-black text-sm hover:bg-[#7B9BC8] transition-all shadow-lg">回到首页</button>
          </div>
        </div>
      </div>
    </main>
  );
}
