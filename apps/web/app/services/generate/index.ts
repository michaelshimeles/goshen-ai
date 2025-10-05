import { authenticateApiKey } from "@/app/services/api-keys/authenticate";
import { drizzle } from "drizzle-orm/node-postgres";
import { Elysia } from 'elysia';
import { Pool } from "pg";
import { defaultJobOpts, generateQueue } from "worker-server/job/queue";
// Setup PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool });


export const generateRoute = new Elysia()
    .post("/v1/generate", async ({ body, headers, set }) => {

        const { prompt, model, userId } = body as {
            prompt: string,
            model: string,
            userId: string
        }

        // const auth = await authenticateApiKey(headers);

        // if (!auth) { set.status = 401; return { error: "unauthorized" }; }

        const payloadId = crypto.randomUUID()

        // add job to the queue
        const job = await generateQueue.add("generate", {
            prompt, model
        },
            {
                ...defaultJobOpts,
                jobId: `generate-${model}:${userId}:${payloadId ?? "all"}`, // idempotency

            }
        )

        return { queued: true, id: job.id };

    })
