const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  role: {
    type: String,
    enum: ["Doctor", "Patient", "Medical-Facility-Worker"],
    required: [true, "Please select a role."],
  },
  firstName: {
    type: String,
    required: [true, "Please add your first name."],
  },
  middleName: {
    type: String,
    required: [true, "Please add your middle name."],
  },
  lastName: {
    type: String,
    required: [true, "Please add your last name."],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: [true, "Please select your gender."],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please add your date of birth."],
  },
  profileImage: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please add an email."],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email. Please add a valid email.",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password."],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  medicalFacilityWorker: {
    type: Schema.Types.ObjectId,
    ref: "MedicalFacilityWorker",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// @desc Encrypt Password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// @desc Sign JWT and return it
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// @desc Match user entered password to hashed password in db
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
