const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notEmpty = (phoneNumbers) => {
  if (phoneNumbers.length === 0) {
    return false;
  } else {
    return true;
  }
};

const DoctorSchema = new Schema({
  specialty: {
    type: String,
    required: [true, "Please add your specialty."],
  },
  clinicName: {
    type: String,
    required: [true, "Please add your clinic name."],
  },
  phoneNumbers: {
    type: [String],
    required: [true, "Please add at least one phone number."],
    validate: [notEmpty, "Please add at least one phone number."],
  },
});

DoctorSchema.methods.getDoctorId = function () {
  return this._id;
};

module.exports = mongoose.model("Doctor", DoctorSchema);
