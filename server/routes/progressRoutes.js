const express = require("express");
const auth = require("../middleware/auth");
const Progress = require("../models/Progress");
const router = express.Router();


// ======================================================
// ================= MONTHLY TRACKER ====================
// ======================================================


// ================= MONTH SAVE =================
router.post("/save", auth, async (req , res) => { 
  try {
    let { year, month, habits } = req.body;

    if (!year || !month || !habits) {
      return res.status(400).json({
        success: false,
        message: "Year, Month & Habits required"
      });
    }

    year = Number(year);
    month = Number(month);

    let record = await Progress.findOne({
      userId: req.user.id,
      year,
      month,
      week: null
    });

    if (record) {
      record.habits = habits;
      await record.save();

      return res.status(200).json({
        success: true,
        message: "Monthly Progress Updated",
        record
      });
    }

    record = await Progress.create({
      userId: req.user.id,
      userName: req.user.name,     // ⭐ user name save
      year,
      month,
      week: null,
      habits
    });

    res.status(201).json({
      success: true,
      message: "Monthly Progress Saved",
      record
    });

  } catch (err) {
    console.log("MONTH Save Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Save Error"
    });
  }
});


// ================= MONTH GET =================
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

    const record = await Progress.findOne({
      userId: req.user.id,
      year,
      month,
      week: null
    });

    res.status(200).json({
      success: true,
      record
    });

  } catch (err) {
    console.log("MONTH Fetch Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Fetch Error"
    });
  }
});



// ======================================================
// ================= WEEKLY TRACKER ====================
// ======================================================


// ================= WEEK SAVE =================
router.post("/week/save", auth, async(req,res)=>{
  try{

    let { year, month, week, habits } = req.body;

    if(!year || !month || !week){
      return res.status(400).json({
        success:false,
        message:"Year, Month, Week required"
      });
    }

    year = Number(year);
    month = Number(month);
    week = Number(week);

    let record = await Progress.findOne({
      userId:req.user.id,
      year,
      month,
      week
    });

    if(record){
      record.habits = habits;
      await record.save();
      return res.json({
        success:true,
        message:"Weekly Progress Updated",
        record
      });
    }

    const newRecord = await Progress.create({
      userId:req.user.id,
      userName:req.user.name,      // ⭐ save user name
      year,
      month,
      week,
      habits
    });

    res.json({
      success:true,
      message:"Weekly Progress Saved",
      record:newRecord
    });

  }catch(err){
    console.log("Week Save Error:",err.message);
    res.status(500).json({
      success:false,
      message:"Save Error"
    });
  }
});


// ================= WEEK GET =================
router.get("/week/get", auth, async(req,res)=>{
  try{
    let { year, month, week } = req.query;

    year = Number(year);
    month = Number(month);
    week = Number(week);

    const record = await Progress.findOne({
      userId:req.user.id,
      year,
      month,
      week
    });

    res.json({
      success:true,
      record
    });

  }catch(err){
    console.log("Week Fetch Error:",err.message);
    res.status(500).json({
      success:false,
      message:"Fetch Error"
    });
  }
});


module.exports = router;
