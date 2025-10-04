import { cors, HTTPMethod } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { WorkOS } from '@workos-inc/node';
import { Pool } from "pg";
import { authEvents, users } from "@workspace/db/schema";
import { Elysia } from 'elysia';
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, desc, and } from "drizzle-orm";

const workos = new WorkOS(process.env.WORKOS_API_KEY);


const swaggerConfig = {
    documenation: {
        info: {
            title: "API Documentation",
            version: "0.0.0",
        },
    },
    path: "/docs",
};

// Setup PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool });

const app = new Elysia({ prefix: "/api" })
    .use(cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"] as HTTPMethod[],
        allowedHeaders: "*",
        maxAge: 5,
    }))
    .use(swagger(swaggerConfig))
    .get("/", async () => {
        "Hello world'"
    })
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
    .post('/create/keys', async ({ }) => {

    })
    .get('/create/keys/list', async ({ }) => {

    })
    .delete('/create/keys/:id', async ({ }) => {

    })

// Expose methods
export const GET = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
export const PUT = app.handle;

export type API = typeof app;