import { NextRequest, NextResponse } from "next/server";
import { 
  validDDDs, 
  isDDDValid, 
  getCarrier, 
  getLineType, 
  isVoIP 
} from "@/lib/phone-data";
import { findUsefulNumber, getCategoryBadge } from "@/lib/useful-numbers";
import { checkSpam } from "@/lib/spam-checker";

// In-memory rate limiting (will upgrade to Redis if needed)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // 10 requests per hour (free tier)
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetAt) {
    // New window
    const resetAt = now + RATE_WINDOW;
    rateLimitMap.set(ip, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT - 1, resetAt };
  }
  
  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }
  
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count, resetAt: record.resetAt };
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const rateLimit = checkRateLimit(ip);
    
    if (!rateLimit.allowed) {
      const resetIn = Math.ceil((rateLimit.resetAt - Date.now()) / 1000 / 60); // minutes
      return NextResponse.json(
        { 
          error: "Limite de verificações atingido",
          message: `Você atingiu o limite gratuito de ${RATE_LIMIT} verificações por hora. Tente novamente em ${resetIn} minutos.`,
          resetIn,
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetAt.toString(),
          }
        }
      );
    }
    
    const { number } = await req.json();
    
    if (!number) {
      return NextResponse.json(
        { error: "Número não fornecido" },
        { status: 400 }
      );
    }
    
    // Clean number
    const cleaned = number.replace(/\D/g, '');
    
    // Check if it's a useful/official number (short codes, emergency, etc)
    const usefulInfo = findUsefulNumber(cleaned);
    if (usefulInfo) {
      const badge = getCategoryBadge(usefulInfo.category);
      return NextResponse.json({
        isValid: true,
        isUsefulNumber: true,
        number: usefulInfo.number,
        name: usefulInfo.name,
        category: badge.label,
        categoryColor: badge.color,
        description: usefulInfo.description,
        isTollFree: usefulInfo.isTollFree || false,
        isShortCode: usefulInfo.isShortCode || false,
        message: `Número oficial: ${usefulInfo.name}`,
      }, {
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetAt.toString(),
        }
      });
    }
    
    // Validate format for regular numbers
    if (cleaned.length < 10 || cleaned.length > 11) {
      return NextResponse.json({
        isValid: false,
        error: "Formato inválido",
        message: "Número deve ter 10 ou 11 dígitos (com DDD)",
      });
    }
    
    // Extract DDD
    const ddd = cleaned.substring(0, 2);
    const dddInfo = validDDDs[ddd];
    
    if (!isDDDValid(ddd)) {
      return NextResponse.json({
        isValid: false,
        error: "DDD inválido",
        message: `O DDD ${ddd} não é válido no Brasil`,
      });
    }
    
    // Get carrier and line type
    const carrier = getCarrier(cleaned);
    const lineType = getLineType(cleaned);
    const isVoIPNumber = isVoIP(cleaned);
    
    // Calculate risk score (basic heuristic)
    let riskScore = 0;
    const warnings: string[] = [];
    
    // VoIP numbers are higher risk for scams
    if (isVoIPNumber && !cleaned.startsWith('0800')) {
      riskScore += 30;
      warnings.push("⚠️ Número VoIP - comum em golpes");
    }
    
    // Sequential digits (11111, 22222)
    if (/(\d)\1{4,}/.test(cleaned)) {
      riskScore += 20;
      warnings.push("⚠️ Números sequenciais - padrão suspeito");
    }
    
    // No carrier identified (rare for mobile)
    if (lineType === "Móvel" && !carrier) {
      riskScore += 15;
      warnings.push("⚠️ Operadora não identificada");
    }
    
    // Check spam databases (Tellows + local)
    const spamCheck = await checkSpam(cleaned);
    
    if (spamCheck.isSpam) {
      riskScore += spamCheck.score * 0.5; // Weight spam score at 50%
      warnings.push(...spamCheck.warnings);
    }
    
    // Determine risk level
    let riskLevel: "BAIXO" | "MÉDIO" | "ALTO";
    if (riskScore < 20) riskLevel = "BAIXO";
    else if (riskScore < 50) riskLevel = "MÉDIO";
    else riskLevel = "ALTO";
    
    const result = {
      isValid: true,
      number: formatNumber(cleaned),
      details: {
        ddd,
        state: dddInfo.state,
        city: dddInfo.city,
        region: dddInfo.region,
        carrier: carrier || "Não identificada",
        type: lineType,
        isVoIP: isVoIPNumber,
      },
      reputation: {
        trustScore: Math.max(0, 100 - riskScore),
        risk: riskLevel,
        warnings,
      },
      spam: spamCheck.isSpam ? {
        score: spamCheck.score,
        sources: spamCheck.sources,
        category: spamCheck.category,
      } : undefined,
      message: warnings.length > 0 
        ? "Este número apresenta características suspeitas"
        : "Número válido sem alertas imediatos",
    };
    
    return NextResponse.json(result, {
      headers: {
        'X-RateLimit-Limit': RATE_LIMIT.toString(),
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetAt.toString(),
      }
    });
    
  } catch (error) {
    console.error("Error verifying phone:", error);
    return NextResponse.json(
      { error: "Erro ao verificar número" },
      { status: 500 }
    );
  }
}

function formatNumber(cleaned: string): string {
  if (cleaned.length === 11) {
    // (XX) 9XXXX-XXXX
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
  } else {
    // (XX) XXXX-XXXX
    return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
  }
}
