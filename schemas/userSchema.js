const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  todo: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Todo"
    }
  ]
});

module.exports = userSchema;