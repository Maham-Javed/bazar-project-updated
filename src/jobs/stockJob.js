import { Queue } from "bullmq";
import redis from "../config/redis.js";

export const stockQueue = new Queue("stockQueue", { connection: redis });

export const enqueueStock = async (data) => {
  await stockQueue.add("update-stock", data);
};
