import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { setMessage } from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ciphertext, iv, ttl } = body;
    
    if (!ciphertext || !iv) {
      return NextResponse.json(
        { error: "Missing ciphertext or iv" },
        { status: 400 }
      );
    }
    
    const id = uuidv4();
    const ttlMs = ttl || 24 * 60 * 60 * 1000; // default 24h
    
    await setMessage(id, { ciphertext, iv }, ttlMs);
    
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
