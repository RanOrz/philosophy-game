import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  // 调用 OpenAI API（这里需要替换 YOUR_OPENAI_API_KEY）
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return NextResponse.json({ reply: data.choices[0].message.content });
}

