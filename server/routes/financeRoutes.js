const express = require("express");
const auth = require("../middleware/auth");
const Finance = require("../models/Finance");
const router = express.Router();


// ================= ADD ENTRY =================
router.post("/add", auth, async (req, res) => {
  try {
    let { year, month, type, amount, note } = req.body;

    if (!year || !month || !type || !amount) {
      return res.status(400).json({
        success: false,
        message: "Year, Month, Type & Amount required"
      });
    }

    year = Number(year);
    month = Number(month);
    amount = Number(amount);

    if (month < 1 || month > 12) {
      return res.status(400).json({
        success: false,
        message: "Month must be between 1 - 12"
      });
    }

    const entry = await Finance.create({
      userId: req.user.id,
      userName: req.user.name,   // 👈 Add this
      year,
      month,
      type,
      amount,
      note: note || ""
    });

    res.status(201).json({
      success: true,
      message: "Entry Added",
      entry
    });

  } catch (err) {
    console.log("FINANCE ADD ERROR:", err.message);
    res.status(500).json({ success: false, message: "Add Failed" });
  }
});


// ================= GET MONTH DATA =================
router.get("/get", auth, async (req, res) => {
  try {
    let { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        success: false,
        message: "Year & Month required"
      });
    }

    year = Number(year);
    month = Number(month);

    const records = await Finance.find({
      userId: req.user.id,
      year,
      month
    });

    let income = 0;
    let expense = 0;

    records.forEach(r => {
      if (r.type === "income") income += r.amount;
      else expense += r.amount;
    });

    res.json({
      success: true,
      records,
      income,
      expense,
      balance: income - expense
    });

  } catch (err) {
    console.log("FINANCE FETCH ERROR:", err.message);
    res.status(500).json({ success: false, message: "Fetch Failed" });
  }
});

module.exports = router;
