import { Queue } from "bullmq";
import redis from "../config/redis.js";

export const stockQueue = new Queue("stockQueue", { connection: redis });

export const enqueueStock = async (data) => {
  const job = await stockQueue.add("update-stock", data, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  });

  console.log(`✅ Enqueued stock job: ID ${job.id}`);
  return job;
};
