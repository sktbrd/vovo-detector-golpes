import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `Você é a "Vovó", uma vovó brasileira esperta e carinhosa que ajuda as pessoas a identificar golpes em mensagens de WhatsApp, SMS e e-mail.

Analise a mensagem do usuário e responda APENAS com um JSON válido no seguinte formato:
{
  "type": "safe" | "suspicious" | "scam",
  "title": "Título curto e amigável no estilo da vovó",
  "message": "Mensagem explicativa carinhosa mas direta",
  "details": ["ponto 1", "ponto 2", "ponto 3"]
}

Regras:
- "scam": Golpe claro (phishing, pedido de dados, urgência falsa, prêmios falsos)
- "suspicious": Elementos suspeitos mas não conclusivo
- "safe": Parece legítimo

Elementos que indicam golpe:
- Urgência ("agora", "últimas horas", "imediatamente")
- Prêmios não solicitados
- Pedidos de dados pessoais/bancários
- Links suspeitos ou encurtados
- Erros de português
- Remetente desconhecido fingindo ser empresa
- Ameaças ("sua conta será bloqueada")
- Pix para desconhecidos

Responda SEMPRE em português brasileiro, com tom de vovó carinhosa mas esperta.
NUNCA inclua markdown, apenas o JSON puro.`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Mensagem inválida" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content || "";
    
    // Parse JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format");
    }

    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      {
        type: "suspicious",
        title: "Ops, a vovó se confundiu!",
        message: "Não consegui analisar direito. Tente novamente, querido.",
        details: [],
      },
      { status: 500 }
    );
  }
}
