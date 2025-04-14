import { Worker, Queue, QueueScheduler } from "bullmq";
import redis from "./src/config/redis.js";
import { recordMovement } from "./src/services/stockService.js";

// Create a QueueScheduler (for job retries and handling failures)
new QueueScheduler("stockQueue", {
  connection: redis,
});

const worker = new Worker(
  "stockQueue",
  async (job) => {
    try {
      console.log(`Processing job ${job.id}:`, job.data);
      await recordMovement(job.data); // Process the job data
      console.log(`Job ${job.id} completed successfully.`);
    } catch (err) {
      console.error(`Job ${job.id} failed:`, err.message);
      throw err; // Ensure that BullMQ knows the job failed
    }
  },
  {
    connection: redis,
    attempts: 5, // Retry up to 5 times if the job fails
    backoff: 1000, // Delay retries by 1 second (can be customized)
    removeOnComplete: true, // Remove job after successful completion
    removeOnFail: true, // Remove job after failure
  }
);

// Graceful shutdown
const shutdown = async () => {
  console.log("Shutting down worker...");
  await worker.close(); // Close the worker gracefully
  console.log("Worker shutdown completed.");
  process.exit(0);
};

// Handle termination signals
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
