const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var notEmpty = function (tests) {
  if (tests.length === 0) {
    return false;
  } else {
    return true;
  }
};

const HealthTestSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  testType: {
    type: String,
    enum: ["Radiology-Test", "Lab-Test"],
    required: [true, "Test type is required"],
  },
  tests: {
    type: [String],
    required: [true, "Please include the required tests."],
    validate: [notEmpty, "Please include the required tests."],
  },
  results: [
    {
      type: String,
    },
  ],
  isFulfilled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HealthTest", HealthTestSchema);
