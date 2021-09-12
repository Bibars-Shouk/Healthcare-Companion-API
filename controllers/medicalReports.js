const MedicalReport = require("../models/MedicalReport");
const Prescription = require("../models/Prescription");
const HealthTest = require("../models/HealthTest");
const AccessCode = require("../models/AccessCode");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc        create new medical report
// @route       POST /api/medical-reports/:accessCode
// @access      Private/Doctor
exports.createMedicalReport = asyncHandler(async (req, res, next) => {
  const { accessCode } = req.params;
  const access = await AccessCode.findOne({ code: accessCode });

  if (!access) {
    return next(new ErrorResponse(`Unauthorized action`, 403));
  }

  const { radiologyTests, labTests, prescription, mainReport } = req.body;
  const report = { ...mainReport };
  report.patient = access.patient;
  report.doctor = req.user.id;

  if (prescription) {
    const newPrescription = await Prescription.create({
      ...prescription,
      patient: access.patient,
      doctor: req.user.id,
    });
    report.prescription = newPrescription._id;
  }

  if (labTests) {
    const newLabTest = await HealthTest.create({
      ...labTests,
      patient: access.patient,
      doctor: req.user.id,
    });
    report.labTests = newLabTest._id;
  }

  if (radiologyTests) {
    const newRadiologyTest = await HealthTest.create({
      ...radiologyTests,
      patient: access.patient,
      doctor: req.user.id,
    });
    report.radiologyTests = newRadiologyTest._id;
  }

  await MedicalReport.create(report);
  res.status(201).json({ success: true });
});

// @desc        get all medical report for a patient by access code
// @route       GET /api/medical-reports/history/:accessCode
// @access      Private/Doctor
exports.getPatientMedicalReports = asyncHandler(async (req, res, next) => {
  const { accessCode } = req.params;
  const access = await AccessCode.findOne({ code: accessCode });

  if (!access) {
    return next(new ErrorResponse(`Unauthorized access`, 401));
  }

  const medicalReports = await MedicalReport.find({
    patient: access.patient,
    isVisible: true,
  });

  res.status(200).json({ success: true, data: medicalReports });
});

// @desc        get all medical report for a patient by his id
// @route       GET /api/medical-reports/history
// @access      Private/Patient
exports.getMedicalReports = asyncHandler(async (req, res, next) => {
  const medicalReports = await MedicalReport.find({ patient: req.user.id });
  res.status(200).json({ success: true, data: medicalReports });
});

// @desc        get medical report by id
// @route       GET /api/medical-reports/:id
// @access      Private
exports.getMedicalReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const selectVal = "-_id -patient -doctor -isFulfilled -createdAt";
  const report = await MedicalReport.findById(id)
    .select("-isVisible")
    .populate({
      path: "prescription",
      select: selectVal,
    })
    .populate({
      path: "radiologyTests",
      select: selectVal,
    })
    .populate({
      path: "labTests",
      select: selectVal,
    })
    .populate({
      path: "patient",
      select: "-_id firstName middleName lastName dateOfBirth",
    })
    .populate({
      path: "doctor",
      select: "-_id firstName middleName lastName",
      populate: {
        path: "doctor",
        select: "-_id specialty clinicName phoneNumbers",
      },
    });

  if (!report) {
    return next(
      new ErrorResponse(`Resource not found with the id of ${id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: report });
});

// @desc        Toggle report visibility
// @route       PUT /api/medical-reports/:id
// @access      Private/Patient
exports.toggleReportVisibility = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await MedicalReport.findById(id);

  if (!report) {
    return next(
      new ErrorResponse(`Resource not found with the id of ${id}`, 404)
    );
  }

  // Checking for ownership
  if (report.patient.toString() !== req.user.id) {
    return next(new ErrorResponse(`Unauthorized action`, 401));
  }

  await MedicalReport.findByIdAndUpdate(id, { isVisible: !report.isVisible });

  res.status(200).json({ success: true });
});
