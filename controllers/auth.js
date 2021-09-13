const nodemailer = require("nodemailer");

const Doctor = require("../models/Doctor");
const MedicalFacilityworker = require("../models/MedicalFacilityworker");
const Patient = require("../models/Patient");
const User = require("../models/User");
const AccessCode = require("../models/AccessCode");

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

// @desc: Get token from model and create cookie and send response
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

// @desc        Log user out and clear cookies
// @route       GET /api/auth/logout
// @access      Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, token: {} });
});

// @desc        Get the current logged in user
// @route       GET /api/auth/me
// @access      Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  let userRole = user.role;
  if (userRole === "Doctor") {
    await user.populate("doctor");
  } else if (userRole === "Patient") {
    await user.populate("patient");
  } else if (userRole === "Medical-Facility-Worker") {
    await user.populate("medicalFacilityWorker");
  }

  res.status(200).json({ success: true, data: user });
});

// @desc        Get an access code for the user
// @route       GET /api/auth/access-code
// @access      Private/patient
exports.getAccessCode = asyncHandler(async (req, res, next) => {
  let accessCode = await AccessCode.find(
    { patient: req.user.id },
    "code"
  ).select("-_id");
  if (accessCode.length > 0) {
    res.status(200).json({ success: true, code: accessCode[0].code });
  } else {
    const accessCodes = await AccessCode.find({}, "code").select("-_id");
    let codesList = [];
    accessCodes.forEach((code) => {
      codesList.push(code.code);
    });

    let generatedCode;

    do {
      generatedCode = generateCode();
    } while (codesList.indexOf(generatedCode) > -1);

    accessCode = await AccessCode.create({
      patient: req.user._id,
      code: generatedCode,
    });

    res.status(200).json({ success: true, code: accessCode.code });
  }
});

// @desc: generate an access code and return it
const generateCode = () => {
  let code = "";

  for (let i = 0; i < 7; i++) {
    let random = Math.floor(Math.random() * 11) + 1;
    if (random <= 5) {
      code += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    } else {
      code += String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
  }
  return code;
};

// @desc        Send email on forgot password
// @route       PUT /api/auth/forgot-password
// @access      public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  let user = await User.findOne({ email: email });

  if (!user) {
    return next(new ErrorResponse(`No account with email ${email}`, 404));
  }

  const code = generateCode();

  await User.findByIdAndUpdate(user._id, {
    resetPasswordToken: code,
    resetPasswordExpire: Date.now() + 60 * 60 * 1000,
  });

  const mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.HCC_EMIL,
      pass: process.env.HCC_EMIL_PASSWORD,
    },
  });

  let message = {
    from: process.env.HCC_EMIL,
    to: email,
    subject: "Forgot your password!",
    text: `It seems you forgot the password for your Healthcare Companion account. Your verification code is ${code} include it with the new password within 1hr`,
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>        
          h2{
            font-weight:300;
          }
          .box1{
            padding:15px;        
            width:90%;
            background-color:#3887d2;
            color:#fff;
            border-radius: 30px 100px;
            text-align:center;
          }        
          p{
            font-size:16px;
          }
          span{
            letter-spacing: 2px;
          }
        </style>
      </head>
      <body>
        <h2>Healthcare Companion</h2>
        <div class="box1">
          <div class="boxContent">
          <h1>Forgotten Password Request.</h1>
          <p>
            It seems you forgot the password for your Healthcare Companion account. <br />
            Your verification code is { <span>${code}</span> }. <br />
            include it with the new password within 1 hour.
          </p>
          </div>
        </div>
      </body>
    </html>
    `,
  };

  try {
    mail.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
        return next(
          new ErrorResponse(
            `Something went wrong with the server while sending the reset password email.`,
            500
          )
        );
      } else {
        res.status(200).json({ success: true });
      }
    });
  } catch (err) {
    console.log(err);

    return next(
      new ErrorResponse(
        `Something went wrong with the server while sending the reset password email.`,
        500
      )
    );
  }
});

// @desc        Reset password
// @route       PUT /api/auth/reset-password
// @access      public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { email, newPassword, verificationCode } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return next(new ErrorResponse(`No account with email ${email}`, 404));
  }

  if (user.resetPasswordToken !== verificationCode) {
    return next(new ErrorResponse(`Invalid verification code.`, 400));
  }

  if (new Date(user.resetPasswordExpire) < new Date(new Date().toISOString())) {
    return next(
      new ErrorResponse(
        `verification code is outdated. Get a new code and try again`,
        400
      )
    );
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendTokenResponse(user, 200, res);
});
