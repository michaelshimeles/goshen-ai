import { keysRoutes } from "@/app/services/api-keys/endpoint";
import { generateRoute } from "@/app/services/generate";
import { webhookRoute } from "@/app/services/webhook";
import { cors, HTTPMethod } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { drizzle } from "drizzle-orm/node-postgres";
import { Elysia } from 'elysia';
import { Pool } from "pg";

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
    .get("/", async ({ headers, body }) => {})
    .use(webhookRoute)
    .use(keysRoutes)
    .use(generateRoute)

// Expose methods
export const GET = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
export const PUT = app.handle;

export type API = typeof app;