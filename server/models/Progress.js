const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  userName:{        
    type:String,
    required:true
  },


  year:{
    type:Number,
    required:true
  },

  month:{
    type:Number,
    required:true
  },
  week:{
  type:Number,
  default:null
},
  habits:[
    {
      title:String,
      days:[Boolean]
    }
  ]

},{timestamps:true});

module.exports = mongoose.model("Progress", progressSchema);
