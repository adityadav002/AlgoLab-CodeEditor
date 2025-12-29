const { Queue } = require("bullmq");

const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};

const codeQueue = new Queue("code-runner", { connection });

codeQueue.on("error", (err) => {
  console.log("❌ QUEUE ERROR:", err);
});

module.exports = codeQueue;
