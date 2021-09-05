const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicalReportSchema = new Schema({
  familyHistoryFindings: {
    findings: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  discoveredAllergies: {
    allergies: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  discoveredChronicConditions: {
    conditions: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  patientComplaints: {
    type: String,
    required: [true, "Please include patient complaints."],
    trim: true,
  },
  symptoms: {
    type: String,
    required: [true, "Please include patient symptoms."],
    trim: true,
  },
  diagnose: {
    type: String,
    required: [true, "Please include the diagnose"],
  },
  prescription: {
    type: Schema.Types.ObjectId,
    ref: "Prescription",
  },
  labTests: {
    type: Schema.Types.ObjectId,
    ref: "HealthTest",
  },
  radiologyTests: {
    type: Schema.Types.ObjectId,
    ref: "HealthTest",
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MedicalReport", MedicalReportSchema);
