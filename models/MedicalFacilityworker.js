const mongoose = require("mongoose");
const User = require("./User");

const notEmpty = (facilityPhoneNumbers) => {
  if (facilityPhoneNumbers.length === 0) {
    return false;
  } else {
    return true;
  }
};

const MedicalFacilityWorkerSchema = new User({
  facilityName: {
    type: String,
    required: [true, "Please add the name of facility you work for."],
  },
  facilityPhoneNumbers: {
    type: [String],
    required: [true, "Please add at least one phone number."],
    validate: [notEmpty, "Please add at least one phone number."],
  },
  facilityType: {
    type: String,
    required: [
      true,
      "Please add the facility type: Radiology-center/Medical-lab",
    ],
    enum: ["Radiology-center", "Medical-lab"],
  },
});

module.exports = mongoose.model(
  "MedicalFacilityWorker",
  MedicalFacilityWorkerSchema
);
