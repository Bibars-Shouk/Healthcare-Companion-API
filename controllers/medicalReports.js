// @desc        create new medical report
// @route       POST /api/medicalreports
// @access      Private
exports.createMedicalReport = (req, res, next) => {
  res.status(201).json({ success: true, msg: "Medical report created" });
};

// @desc        create new medical report
// @route       GET /api/medicalreports/:id
// @access      Private
exports.getMedicalReport = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show Medical report" });
};
