import { Redis } from '@upstash/redis'

// Upstash Redis client
// Free tier: 10,000 commands/day
// Get credentials: https://console.upstash.com

let redis: Redis | null = null;

// Check if Redis is configured
const isConfigured = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

if (isConfigured) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
}

// Fallback to in-memory for development/testing
const memoryStore = new Map<string, {
  ciphertext: string;
  iv: string;
  createdAt: number;
  expiresAt: number;
}>();

// Cleanup expired messages (only for in-memory)
if (!isConfigured) {
  setInterval(() => {
    const now = Date.now();
    for (const [id, msg] of memoryStore.entries()) {
      if (msg.expiresAt < now) {
        memoryStore.delete(id);
      }
    }
  }, 5 * 60 * 1000);
}

export async function setMessage(
  id: string,
  data: { ciphertext: string; iv: string },
  ttlMs: number
): Promise<void> {
  if (redis) {
    // Use Redis with TTL (in seconds)
    await redis.set(id, JSON.stringify(data), { ex: Math.floor(ttlMs / 1000) });
  } else {
    // Fallback to in-memory
    const now = Date.now();
    memoryStore.set(id, {
      ...data,
      createdAt: now,
      expiresAt: now + ttlMs,
    });
  }
}

export async function getMessage(
  id: string
): Promise<{ ciphertext: string; iv: string } | null> {
  if (redis) {
    // Get from Redis (returns null if not found or expired)
    const data = await redis.get<{ ciphertext: string; iv: string }>(id);
    return data;
  } else {
    // Get from in-memory
    const msg = memoryStore.get(id);
    if (!msg) return null;
    
    // Check if expired
    if (msg.expiresAt < Date.now()) {
      memoryStore.delete(id);
      return null;
    }
    
    return { ciphertext: msg.ciphertext, iv: msg.iv };
  }
}

export async function deleteMessage(id: string): Promise<void> {
  if (redis) {
    await redis.del(id);
  } else {
    memoryStore.delete(id);
  }
}

export function isRedisConfigured(): boolean {
  return !!redis;
}
