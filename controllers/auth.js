const Doctor = require("../models/Doctor");
const MedicalFacilityworker = require("../models/MedicalFacilityworker");
const Patient = require("../models/Patient");
const User = require("../models/User");

const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc        Register a new user
// @route       POST /api/auth/register
// @access      Public
exports.register = asyncHandler(async (req, res, next) => {
  const { user, doctor, patient, medicalFacilityWorker } = req.body;
  let subDoc;
  let userOfType = {};

  if (!user || (!doctor && !patient && !medicalFacilityWorker)) {
    return next(
      new ErrorResponse(
        `Please include the user information with the specified role information`,
        400
      )
    );
  }

  if (doctor) {
    subDoc = await Doctor.create(doctor);
    userOfType.doctor = subDoc.getDoctorId();
  } else if (patient) {
    subDoc = await Patient.create(patient);
    userOfType.patient = subDoc.getPatientId();
  } else if (medicalFacilityWorker) {
    subDoc = await MedicalFacilityworker.create(medicalFacilityWorker);
    userOfType.medicalFacilityWorker = subDoc.getWorkerId();
  }

  const newUser = await User.create({ ...user, ...userOfType });

  sendTokenResponse(newUser, 200, res);
});

// @desc        Login a user
// @route       POST /api/auth/login
// @access      Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please include an email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// ? Get token from model and create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
