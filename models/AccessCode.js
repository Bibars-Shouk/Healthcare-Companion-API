const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccessCodeSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    code: {
      type: String,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      expires: 24 * 60 * 60,
    },
  },
  {
    timestamps: true,
  }
);

AccessCodeSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("AccessCode", AccessCodeSchema);
