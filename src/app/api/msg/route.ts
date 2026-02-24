import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// In-memory storage (temporary - will migrate to Upstash Redis/Supabase)
const messages = new Map<string, {
  ciphertext: string;
  iv: string;
  createdAt: number;
  expiresAt: number;
}>();

// Cleanup expired messages every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [id, msg] of messages.entries()) {
    if (msg.expiresAt < now) {
      messages.delete(id);
    }
  }
}, 5 * 60 * 1000);

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
    const now = Date.now();
    const expiresIn = ttl || 24 * 60 * 60 * 1000; // default 24h
    
    messages.set(id, {
      ciphertext,
      iv,
      createdAt: now,
      expiresAt: now + expiresIn,
    });
    
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
