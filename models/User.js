const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = function (childSchema) {
  // User base schema
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  //? TODO:  Encrypt Password -  Sign JWT and return

  UserSchema.add(childSchema);

  return UserSchema;
};
