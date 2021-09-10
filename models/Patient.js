const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
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

PatientSchema.methods.getPatientId = function () {
  return this._id;
};

module.exports = mongoose.model("Patient", PatientSchema);
