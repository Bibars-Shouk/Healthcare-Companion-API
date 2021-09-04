const MedicalReport = require("../models/MedicalReport");

// @desc        create new medical report
// @route       POST /api/medical-reports
// @access      Private
exports.createMedicalReport = async (req, res, next) => {
  try {
    const medicalReport = await MedicalReport.create(req.body);
    res.status(201).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc        create new medical report
// @route       GET /api/medical-reports/:id
// @access      Private
exports.getMedicalReport = async (req, res, next) => {
  try {
    const report = await MedicalReport.findById(req.params.id);
    res.status(200).json({ success: true, data: report });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
