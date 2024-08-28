const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
  },
  leftEyeImage: {
    type: String,
    required: true,
  },
  rightEyeImage: {
    type: String,
    required: true,
  },
});

// Create an index on patientId for efficient searching
patientSchema.index({ patientId: 1 }, { unique: true });

module.exports = mongoose.model("Patient", patientSchema);
