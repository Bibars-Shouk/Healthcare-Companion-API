const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notEmpty = (medications) => {
  if (medications.length === 0) {
    return false;
  } else {
    return true;
  }
};

const PrescriptionSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  medications: {
    type: [String],
    required: true,
    validate: [
      notEmpty,
      "Please add one medication at least to create a prescription.",
    ],
  },
  additionalInformation: {
    type: String,
    trim: true,
  },
  isFulfilled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
