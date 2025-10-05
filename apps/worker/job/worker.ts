// server/job/worker.ts (inside scrapeStripe)
import { config } from "dotenv";
config();

import { Job, Worker } from "bullmq";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { getConnection } from "./env";
import { GENERATE_QUEUE_NAME, generateQueue } from "./queue";

type GeneratePayload = { userId?: string; };

const connection = getConnection();

// Setup PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle({ client: pool });


const concurrency = Number(process.env.WORKER_CONCURRENCY ?? 3);

const worker = new Worker(
    GENERATE_QUEUE_NAME,
    async (job: Job<GeneratePayload>) => {
        if (job.name !== "generate") throw new Error(`Unknown job: ${job.name}`);

        // Use a default userId if not provided - in production this should come from the job data
        const userId = job.data.userId

        // return scrapeStripe({
        //   stripeApiKey: job.data.stripeApiKey,
        //   userId: userId,
        //   jobId: job.id || nanoid()
        // });
    },
    {
        connection,
        concurrency,
    }
);

// Worker ready
worker.on("ready", async () => {
    console.log("✅ Worker is ready and waiting for jobs!");

    // Check for waiting jobs
    const waitingJobs = await generateQueue.getWaitingCount();
    console.log(`📋 Found ${waitingJobs} waiting jobs in queue`);
});


// Graceful shutdown
const stop = async () => {
    console.log("Closing worker...");
    await worker.close(); // lets current jobs finish
    await pool.end();
    process.exit(0);
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
