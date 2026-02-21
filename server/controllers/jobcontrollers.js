const Job = require("../models/job");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const { company, role, status, notes } = req.body;

    const job = await Job.create({
      user: req.user._id, // comes from auth middleware
      company,
      role,
      status,
      notes,
    });

    res.status(201).json(job);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // 🔐 Ensure user owns the job
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedJob);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Job Stats
exports.getJobStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      {
        $match: { user: req.user._id }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert array into object
    const formattedStats = {
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0
    };

    stats.forEach(item => {
      formattedStats[item._id] = item.count;
    });

    const total =
      formattedStats.Applied +
      formattedStats.Interview +
      formattedStats.Offer +
      formattedStats.Rejected;

    res.status(200).json({
      total,
      ...formattedStats
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};