import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { personalityCode, personalityName, motto, similarity, siteUrl } = await req.json();

    if (!personalityCode || !personalityName) {
      return NextResponse.json({ error: "缺少必要参数" }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";

    if (!apiKey) {
      const fallbackText = `我在 PBTI 产品人格测试中测出了【${personalityCode} · ${personalityName}】！\n「${motto}」\n匹配度 ${similarity}%\n\n你是 VIBE 还是 SLEEP？来测测 👉 ${siteUrl}`;
      return NextResponse.json({ text: fallbackText, isFallback: true });
    }

    const prompt = `你是一个有趣的产品经理人格测试助手。用户测出了【${personalityCode} · ${personalityName}】人格，格言是"${motto}"，匹配度${similarity}%。

请生成一段适合分享到社交媒体的文案，要求：
1. 保持核心信息：人格代码和名称、格言、匹配度、测试链接 ${siteUrl}
2. 风格活泼有趣，符合产品经理群体，可以适当调侃或自嘲
3. 100字以内
4. 可以加emoji增加趣味性
5. 不要用markdown格式，直接输出纯文本

直接输出文案内容，不要有任何解释或额外说明。`;

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
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

    if (!response.ok) {
      const fallbackText = `我在 PBTI 产品人格测试中测出了【${personalityCode} · ${personalityName}】！\n「${motto}」\n匹配度 ${similarity}%\n\n你是 VIBE 还是 SLEEP？来测测 👉 ${siteUrl}`;
      return NextResponse.json({ text: fallbackText, isFallback: true });
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content || "";

    if (!generatedText) {
      const fallbackText = `我在 PBTI 产品人格测试中测出了【${personalityCode} · ${personalityName}】！\n「${motto}」\n匹配度 ${similarity}%\n\n你是 VIBE 还是 SLEEP？来测测 👉 ${siteUrl}`;
      return NextResponse.json({ text: fallbackText, isFallback: true });
    }

    return NextResponse.json({ text: generatedText.trim(), isFallback: false });
  } catch (error) {
    console.error("AI生成文案失败:", error);
    return NextResponse.json({ error: "生成失败，请稍后重试" }, { status: 500 });
  }
}