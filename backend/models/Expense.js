const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
    reason:{
        type: String,
        required: true
    },
    cost:{
        type: String,
        required: true, 
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('expense', ExpenseSchema);