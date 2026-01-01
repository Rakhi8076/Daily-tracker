const mongoose = require("mongoose");

const weeklySchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  userName:{
    type:String,
    required:true
  },

  week: {
    type: Number,
    required: true
  },

  habits: [
    {
      title: String,
      days: [Boolean]     // Example: [true,false,true,false,true,false,true]
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Weekly", weeklySchema);
