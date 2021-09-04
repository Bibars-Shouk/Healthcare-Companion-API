const MedicalReport = require("../models/MedicalReport");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc        create new medical report
// @route       POST /api/medical-reports
// @access      Private
exports.createMedicalReport = asyncHandler(async (req, res, next) => {
  await MedicalReport.create(req.body);
  res.status(201).json({ success: true });
});

// @desc        get medical report by id
// @route       GET /api/medical-reports/:id
// @access      Private
exports.getMedicalReport = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const report = await MedicalReport.findById(id);

  if (!report) {
    return next(
      new ErrorResponse(`Resource not found with the id of ${id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: report });
});
