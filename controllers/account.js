const path = require("path");

const User = require("../models/User");

const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Patient = require("../models/Patient");

// @desc        Change user email
// @route       PUT /api/account/update-email
// @access      Private
exports.changeEmail = asyncHandler(async (req, res, next) => {
  const { newEmail, password } = req.body;
  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Incorrect password", 401));
  }

  await User.findByIdAndUpdate(
    req.user.id,
    { email: newEmail },
    { runValidators: true }
  );

  res.status(200).json({ success: true });
});

// @desc        Change user password
// @route       PUT /api/account/update-password
// @access      Private
exports.changePassword = asyncHandler(async (req, res, next) => {
  const { newPassword, oldPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await user.matchPassword(oldPassword);

  if (!isMatch) {
    return next(new ErrorResponse("Incorrect password", 401));
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({ success: true });
});

// @desc        Change user profile image
// @route       PUT /api/account/update-profile-image
// @access      Private
exports.updateProfileImage = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  const file = req.files.img;

  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  if (file.size > 1024 * 1024 * 3) {
    return next(new ErrorResponse(`Please upload an image less than 3Mb`, 400));
  }

  const user = await User.findById(req.user.id);

  file.name = `img_${user._id}${path.parse(file.name).ext}`;

  file.mv(`./public/profile/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(
        new ErrorResponse(
          `Something went wrong while uploading your profile image`,
          500
        )
      );
    }
  });

  await User.findByIdAndUpdate(req.user.id, { profileImage: file.name });

  res.status(200).json({ success: true, data: file.name });
});

// @desc        Update patient habits
// @route       PUT /api/account/update-habits
// @access      Private/Patient
exports.updateHabits = asyncHandler(async (req, res, next) => {
  const { habits } = req.body;
  const user = await User.findById(req.user.id);
  await Patient.findByIdAndUpdate(user.patient, habits);

  res.status(200).json({ success: true });
});
