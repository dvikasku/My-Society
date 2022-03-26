const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComplainSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    flat_no:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    status:{
        type: String,
        default: "Pending"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('complain', ComplainSchema);