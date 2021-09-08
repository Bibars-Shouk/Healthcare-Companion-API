const mongoose = require("mongoose");
const User = require("./User");

const notEmpty = (phoneNumbers) => {
  if (phoneNumbers.length === 0) {
    return false;
  } else {
    return true;
  }
};

const DoctorSchema = new User({
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

module.exports = mongoose.model("Doctor", DoctorSchema);
