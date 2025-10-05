// apps/api/src/lib/auth-api-key.ts
import { createHash } from "crypto";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { apiKeys } from "@workspace/db/schema";
import { Pool } from "pg";

// Setup PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool });

export async function authenticateApiKey(headers: Record<string, string | undefined>) {
    const raw = headers["x-api-key"] ?? "";
    const hash = createHash("sha256").update(raw).digest("hex");
    const [key] = await db.select().from(apiKeys)
        .where(and(eq(apiKeys.keyHash, hash), eq(apiKeys.active, true))).limit(1);
    if (!key) return null;
    return { userId: key.userId, keyId: key.id };
}
