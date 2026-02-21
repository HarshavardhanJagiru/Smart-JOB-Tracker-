const express = require("express");
const { createJob, getJobs, updateJob, deleteJob, getJobStats } = require("../controllers/jobcontrollers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/stats", authMiddleware, getJobStats);
router.get("/", authMiddleware, getJobs);
router.delete("/:id", authMiddleware, deleteJob);
router.put("/:id", authMiddleware, updateJob);
module.exports = router;