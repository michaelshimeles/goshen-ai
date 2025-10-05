// server/job/queue.ts
import { config } from "dotenv";
config();

import { JobsOptions, Queue } from "bullmq";
import { getConnection } from "./env";

export const GENERATE_QUEUE_NAME = "generate";

const connection = getConnection();
export const generateQueue = new Queue(GENERATE_QUEUE_NAME, { connection });

export const defaultJobOpts: JobsOptions = {
    attempts: 1,
    backoff: { type: "exponential", delay: 1000 },
    removeOnComplete: { age: 3600, count: 1000 },
    removeOnFail: { age: 24 * 3600 },
};