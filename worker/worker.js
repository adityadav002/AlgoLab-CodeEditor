const { Worker } = require("bullmq");

// FIXED PATHS — all files are in /app inside the container
const runCpp = require("./runCpp");
const runPython = require("./runPy");
const runJs = require("./runJs");

const worker = new Worker(
  "code-runner",
  async (job) => {
    if (job.data.lang === "cpp")
      return await runCpp(job.data.code, job.data.input);
    if (job.data.lang === "python")
      return await runPython(job.data.code, job.data.input);
    if (job.data.lang === "javascript")
      return await runJs(job.data.code, job.data.input);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: 6379,
      maxRetriesPerRequest: null,
    },
    autorun: true,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});
