const express = require("express");
const cors = require("cors");
const codeQueue = require("./queue");

const app = express();
app.use(express.json());
app.use(cors());

// Submit job
app.post("/run", async (req, res) => {
    const { code, lang, input } = req.body;

    if (!code || !lang) {
        return res.status(400).json({ error: "code and lang are required" });
    }

    const job = await codeQueue.add("run", { code, lang, input });

    res.json({
        jobId: job.id,
        message: "Job submitted!"
    });
});

// Get job result
app.get("/result/:id", async (req, res) => {
    const id = req.params.id;

    const job = await codeQueue.getJob(id);
    if (!job) {
        return res.json({ error: "Job not found" });
    }

    const state = await job.getState();
    const response = { state };

    if (state === "completed") {
        response.result = await job.returnvalue;
    } else if (state === "failed") {
        response.error = job.failedReason;
    }

    res.json(response);
});

app.listen(4000, () => console.log("Server running on port 4000"));
