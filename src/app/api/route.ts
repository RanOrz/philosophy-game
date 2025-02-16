import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer YOUR_OPENAI_API_KEY`, // ⬅️ 替换你的 API Key
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "你是一位哲学导师，引导用户思考哲学问题。" },
          { role: "user", content: message }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    // 处理可能的 API 错误
    if (!data.choices || data.choices.length === 0) {
      return NextResponse.json({ error: "OpenAI API 没有返回有效数据", details: data }, { status: 500 });
    }

    return NextResponse.json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error("API 调用错误:", error);
    return NextResponse.json({ error: "服务器错误", details: error.toString() }, { status: 500 });
  }
}
