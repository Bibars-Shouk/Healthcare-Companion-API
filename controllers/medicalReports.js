const MedicalReport = require("../models/MedicalReport");
const Prescription = require("../models/Prescription");
const HealthTest = require("../models/HealthTest");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc        create new medical report
// @route       POST /api/medical-reports
// @access      Private
exports.createMedicalReport = asyncHandler(async (req, res, next) => {
  const { radiologyTests, labTests, prescription, mainReport } = req.body;
  const report = { ...mainReport };

  if (prescription) {
    const newPrescription = await Prescription.create(prescription);
    report.prescription = newPrescription._id;
  }

  if (labTests) {
    const newLabTest = await HealthTest.create(labTests);
    report.labTests = newLabTest._id;
  }

  if (radiologyTests) {
    const newRadiologyTest = await HealthTest.create(radiologyTests);
    report.radiologyTests = newRadiologyTest._id;
  }

  await MedicalReport.create(report);
  res.status(201).json({ success: true });
});

// @desc        get medical report by id
// @route       GET /api/medical-reports/:id
// @access      Private
exports.getMedicalReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await MedicalReport.findById(id)
    .populate("prescription")
    .populate("radiologyTests")
    .populate("labTests");

  if (!report) {
    return next(
      new ErrorResponse(`Resource not found with the id of ${id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: report });
});

// @desc        Toggle report visibility
// @route       PUT /api/medical-reports/:id
// @access      Private
exports.toggleReportVisibility = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await MedicalReport.findById(id);

  if (!report) {
    return next(
      new ErrorResponse(`Resource not found with the id of ${id}`, 404)
    );
  }

  await MedicalReport.findByIdAndUpdate(id, { isVisible: !report.isVisible });

  res.status(200).json({ success: true });
});
