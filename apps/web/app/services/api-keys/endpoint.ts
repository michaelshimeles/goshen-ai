// apps/api/src/routes/keys.ts
import { workos } from "@/lib/workos";
import { apiKeys } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Elysia } from "elysia";
import { Pool } from "pg";
import { generateRawKey } from "./generate"; // adjust path

// Setup PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool });


export const keysRoutes = new Elysia()
    .group("/admin", app =>
        app.post("/keys", async ({ body }) => {
                const { userId } = body as { userId: string };

                const user = await workos.userManagement.getUser(userId);

                if (!user) {
                    throw new Error("Unauthorized")
                }

                const { raw, last4, keyHash } = generateRawKey();

                const doesApiKeyExist = await
                    db.select()
                        .from(apiKeys)
                        .where(eq(apiKeys.userId, user.id));

                if (!doesApiKeyExist) {
                    await db.insert(apiKeys).values({
                        id: crypto.randomUUID(),
                        userId: user.id,
                        label: "default",
                        keyHash,
                        lastFour: last4,
                        active: true
                    });
                    return { apiKey: raw, last4, label: "default" };
                }

                await db.update(apiKeys).set({
                    label: "default",
                    keyHash,
                    lastFour: last4,
                }).where(eq(apiKeys.userId, user.id));

                return { apiKey: raw, last4, label: "default" };


            })
            .get("/keys", async ({ query }) => {

                const { userId } = query as { userId: string };

                const user = await workos.userManagement.getUser(userId);

                if (!user) {
                    throw new Error("Unauthorized")
                }

                const rows = await db.select().from(apiKeys).where(eq(apiKeys.userId, user.id));
                return rows.map(k => ({
                    id: k.id, label: k.label, active: k.active, last4: k.lastFour, createdAt: k.createdAt
                }));
            })
            .delete("/keys/:id", async ({ }) => {
            })
    );
