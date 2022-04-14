const mongoose = require('mongoose');
const { Schema } = mongoose;

const BillsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    flat_no:{
        type: String,
        required: true
    },
    bill_no:{
        type: Integer,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    due_date:{
        type: Date,
        required: true
    },
  });

  module.exports = mongoose.model('bills', BillsSchema);