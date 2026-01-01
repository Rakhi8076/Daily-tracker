const mongoose = require("mongoose");

const financeSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
   userName:{
    type:String,
    required:true
  },

  year: {
    type: Number,
    required: true
  },

  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },

  type: {
    type: String,
    required: true,
    enum: ["income", "expense"]   // only these allowed
  },

  amount: {
    type: Number,
    required: true,
    min: 1
  },

  note: {
    type: String,
    default: ""
  }

}, { timestamps: true });

module.exports = mongoose.model("Finance", financeSchema);
