import { workos } from "@/lib/workos";
import { authEvents, users } from "@workspace/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Elysia } from 'elysia';
import { Pool } from "pg";
// Setup PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool });


export const webhookRoute = new Elysia()
    .post("/webhook/auth", async ({ body, headers }) => {
        const payload = body
        const sigHeader = headers['workos-signature']

        const webhook = await workos.webhooks.constructEvent({
            payload: payload,
            sigHeader: sigHeader!,
            secret: process.env.WEBHOOK_SECRET!,
        });


        const { id: eventId, createdAt, event: eventType, data } = webhook;
        // NOTE: data keys are camelCase
        const { type, status, email, userId, ipAddress, userAgent } = data as {
            type: string;
            status: string;
            email: string;
            userId: string;
            ipAddress?: string;
            userAgent?: string;
        };

        // Idempotent insert (skip if we've seen this event before)
        // 1) log the event idempotently
        await db.insert(authEvents).values({
            eventId, eventType, type, status, email, userId,
            ipAddress, userAgent, occurredAt: new Date(createdAt), webhook: webhook
        }).onConflictDoNothing({ target: authEvents.eventId });

        // 2) only upsert profile on success
        if (status === 'succeeded') {
            await db.insert(users).values({
                userId: userId,
                email,
            })
        }


        return {
            status: 200,
        }
    })
