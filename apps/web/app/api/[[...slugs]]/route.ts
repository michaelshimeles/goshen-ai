import { cors, HTTPMethod } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { drizzle } from "drizzle-orm/node-postgres";
import { Elysia } from 'elysia';
import { Pool } from "pg";
import { WorkOS } from '@workos-inc/node';
import { users } from "@workspace/db/schema";

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

        console.log('payload', payload)
        const webhook = await workos.webhooks.constructEvent({
            payload: payload,
            sigHeader: sigHeader!,
            secret: process.env.WEBHOOK_SECRET!,
        });


        const { data } = webhook;
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
        await db
            .insert(users)
            .values({
                type,
                status,
                email,
                userId,
                ipAddress,
                userAgent,
            })


        return {
            status: 200
        }

    })

// Expose methods
export const GET = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
export const PUT = app.handle;

export type API = typeof app;