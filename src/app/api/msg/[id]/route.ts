import { NextRequest, NextResponse } from "next/server";
import { getMessage, deleteMessage } from "@/lib/redis";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const message = await getMessage(id);
    
    if (!message) {
      return NextResponse.json(
        { error: "Message not found or already read" },
        { status: 404 }
      );
    }
    
    // Delete immediately after reading (one-time read)
    await deleteMessage(id);
    
    return NextResponse.json(message);
  } catch (error) {
    console.error("Error retrieving message:", error);
    return NextResponse.json(
      { error: "Failed to retrieve message" },
      { status: 500 }
    );
  }
}
