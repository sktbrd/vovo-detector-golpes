import { NextRequest, NextResponse } from "next/server";

// Same in-memory storage (shared via module scope)
// In production, use Upstash Redis or Supabase
const messages = new Map<string, {
  ciphertext: string;
  iv: string;
  createdAt: number;
  expiresAt: number;
}>();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const message = messages.get(id);
    
    if (!message) {
      return NextResponse.json(
        { error: "Message not found or already read" },
        { status: 404 }
      );
    }
    
    // Check if expired
    if (message.expiresAt < Date.now()) {
      messages.delete(id);
      return NextResponse.json(
        { error: "Message expired" },
        { status: 410 }
      );
    }
    
    // Return message and DELETE immediately (one-time read)
    const data = {
      ciphertext: message.ciphertext,
      iv: message.iv,
    };
    
    messages.delete(id);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error retrieving message:", error);
    return NextResponse.json(
      { error: "Failed to retrieve message" },
      { status: 500 }
    );
  }
}
