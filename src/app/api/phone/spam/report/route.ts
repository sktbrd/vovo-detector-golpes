import { NextRequest, NextResponse } from "next/server";
import { reportSpam } from "@/lib/spam-checker";
import { createHash } from "crypto";

// Rate limiting for spam reports (prevent abuse)
const reportLimitMap = new Map<string, { count: number; resetAt: number }>();
const REPORT_LIMIT = 5; // 5 reports per hour per IP
const REPORT_WINDOW = 60 * 60 * 1000;

function checkReportRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = reportLimitMap.get(ip);
  
  if (!record || now > record.resetAt) {
    reportLimitMap.set(ip, { count: 1, resetAt: now + REPORT_WINDOW });
    return true;
  }
  
  if (record.count >= REPORT_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    if (!checkReportRateLimit(ip)) {
      return NextResponse.json(
        { error: "Limite de denúncias atingido. Tente novamente em 1 hora." },
        { status: 429 }
      );
    }
    
    const { number, category, comment } = await req.json();
    
    if (!number || !category) {
      return NextResponse.json(
        { error: "Número e categoria são obrigatórios" },
        { status: 400 }
      );
    }
    
    // Validate category
    const validCategories = ['golpe', 'telemarketing', 'cobranca', 'outro'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Categoria inválida" },
        { status: 400 }
      );
    }
    
    // Hash IP for privacy
    const ipHash = createHash('sha256').update(ip).digest('hex');
    
    const success = await reportSpam(number, category, comment, ipHash);
    
    if (success) {
      return NextResponse.json({ 
        success: true,
        message: "Denúncia registrada com sucesso!" 
      });
    } else {
      return NextResponse.json(
        { error: "Erro ao registrar denúncia" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error reporting spam:", error);
    return NextResponse.json(
      { error: "Erro ao processar denúncia" },
      { status: 500 }
    );
  }
}
