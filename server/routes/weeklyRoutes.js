const express = require("express");
const auth = require("../middleware/auth");
const Weekly = require("../models/Weekly");
const router = express.Router();


// ================= SAVE WEEK =================
router.post("/save", auth, async (req, res) => {
  try {

    const { week, habits } = req.body;

    if (!week || !habits) {
      return res.json({
        success: false,
        message: "Week & habits required"
      });
    }

    let record = await Weekly.findOne({
      userId: req.user.id,
      week: Number(week)
    });

    if (record) {
      record.habits = habits;
      await record.save();

      return res.json({
        success: true,
        message: "Week Updated",
        record
      });
    }

    // 🔥 NEW ENTRY SAVE WITH USERNAME
    record = await Weekly.create({
      userId: req.user.id,
      userName: req.user.name,     // ← ADD THIS
      week: Number(week),
      habits
    });

    res.json({
      success: true,
      message: "Week Saved",
      record
    });

  } catch (err) {
    console.log("WEEK SAVE ERROR:", err.message);
    res.json({
      success: false,
      message: "Save Failed"
    });
  }
});


// ================= GET WEEK =================
router.get("/get", auth, async (req, res) => {
  try {
    const { week } = req.query;

    if (!week) {
      return res.json({
        success: false,
        message: "Week required"
      });
    }

    const record = await Weekly.findOne({
      userId: req.user.id,
      week: Number(week)
    });

    return res.json({
      success: true,
      record
    });

  } catch (err) {
    console.log("WEEK FETCH ERROR:", err.message);
    res.json({
      success: false,
      message: "Fetch Failed"
    });
  }
});

module.exports = router;
