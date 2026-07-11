const express = require("express");
const router = express.Router();

const Problem = require("../models/Problem");
const authMiddleware = require("../middleware/authMiddleware");



router.post("/", authMiddleware, async (req, res) => {
  try {
    const problem = await Problem.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.get("/", authMiddleware, async (req, res) => {
  try {
    const problems = await Problem.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(problems);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});



router.get("/stats/summary", authMiddleware, async (req, res) => {
  try {
    const problems = await Problem.find({
      userId: req.user.id,
    });

    const summary = {
      total: problems.length,
      solved: problems.filter(
        (p) => p.status === "Solved"
      ).length,

      easy: problems.filter(
        (p) => p.difficulty === "Easy"
      ).length,

      medium: problems.filter(
        (p) => p.difficulty === "Medium"
      ).length,

      hard: problems.filter(
        (p) => p.difficulty === "Hard"
      ).length,
    };

    res.json(summary);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});



router.get("/stats/streak", authMiddleware, async (req, res) => {
  try {
    const problems = await Problem.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    const solvedDates = new Set(
      problems
        .filter((p) => p.status === "Solved")
        .map((p) =>
          new Date(p.createdAt).toDateString()
        )
    );

    let streak = 0;

    let current = new Date();

    while (true) {
      if (solvedDates.has(current.toDateString())) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    res.json({
      streak,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/stats/heatmap", authMiddleware, async (req, res) => {
  try {
    const problems = await Problem.find({
      userId: req.user.id,
      status: "Solved",
    });

    const activityMap = {};

    problems.forEach((problem) => {
      const date = new Date(problem.createdAt)
        .toISOString()
        .split("T")[0];

      activityMap[date] = (activityMap[date] || 0) + 1;
    });

    const heatmap = [];

    const today = new Date();

    // Last 365 days
    for (let i = 364; i >= 0; i--) {
      const current = new Date(today);

      current.setDate(today.getDate() - i);

      const key = current.toISOString().split("T")[0];

      heatmap.push({
        date: key,
        count: activityMap[key] || 0,
      });
    }

    res.json(heatmap);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const problem = await Problem.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!problem) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    res.json(problem);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});



router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Problem.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Problem not found",
      });
    }

    res.json({
      message: "Problem deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;