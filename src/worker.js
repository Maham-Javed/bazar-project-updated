import { Worker } from "bullmq";
import redis from "./src/config/redis.js";
import { recordMovement } from "./src/services/stockService.js";

new Worker(
  "stockQueue",
  async (job) => {
    await recordMovement(job.data);
  },
  { connection: redis }
);
