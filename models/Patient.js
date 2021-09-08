const mongoose = require("mongoose");
const User = require("./User");

const PatientSchema = new User({
  smokingHistory: {
    type: String,
    required: [true, "Please add your smoking history"],
    enum: ["Smoker", "Former smoker", "Abstaining"],
  },
  alcoholIntake: {
    type: String,
    required: [true, "Please add your alcohol use history"],
    enum: ["Alcoholic", "Former alcoholic", "Abstaining"],
  },
  drugUse: {
    type: String,
    required: [true, "Please add your drug use history"],
    enum: ["Drug Addict", "Former drug user", "Abstaining"],
  },
  familyHistoryInformation: {
    type: [String],
  },
  allergies: {
    type: [String],
  },
  chronicConditions: {
    type: [String],
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
