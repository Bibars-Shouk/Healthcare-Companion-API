const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const MedicalFacilityWorker = require("../models/MedicalFacilityworker");

const asyncHandler = require("../middleware/async");

exports.register = asyncHandler(async (req, res, next) => {
  const { doctor, patient, medicalFacilityWorker } = req.body.user;
  if (doctor) {
    const newDoctor = await Doctor.create(doctor);
    return res.status(200).json({ success: true, data: newDoctor });
  } else if (patient) {
    const newPatient = await Patient.create(patient);
    return res.status(200).json({ success: true, data: newPatient });
  } else if (medicalFacilityWorker) {
    const newFacilityWorker = await MedicalFacilityWorker.create(
      medicalFacilityWorker
    );
    return res.status(200).json({ success: true, data: newFacilityWorker });
  }
});
