import { NextRequest, NextResponse } from "next/server";
import { checkSpam } from "@/lib/spam-checker";

export async function POST(req: NextRequest) {
  try {
    const { number } = await req.json();
    
    if (!number) {
      return NextResponse.json(
        { error: "Número não fornecido" },
        { status: 400 }
      );
    }
    
    const result = await checkSpam(number);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error checking spam:", error);
    return NextResponse.json(
      { error: "Erro ao verificar spam" },
      { status: 500 }
    );
  }
}
