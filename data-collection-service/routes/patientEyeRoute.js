const express = require("express");
const router = express.Router();
const PatientEye = require("../models/PatientEye");
const upload = require("../config/multerConfig");

// Configure upload fields
const uploadFields = upload.fields([
  { name: "leftEyeImage", maxCount: 1 },
  { name: "rightEyeImage", maxCount: 1 },
]);

// API endpoint for image upload
router.post("/upload", uploadFields, async (req, res) => {
  try {
    const patientId = req.body.patientId;
    console.log("Patient ID:", patientId);

    if (!patientId) {
      throw new Error("Patient ID is required");
    }

    // Check if a document with the provided patientId exists
    const existingPatient = await PatientEye.findOne({ patientId: patientId });

    if (!existingPatient) {
      throw new Error("Patient with ID not found");
    }

    // If we reach here, the patient exists and files are uploaded
    const leftEyeImage = req.files.leftEyeImage[0];
    const rightEyeImage = req.files.rightEyeImage[0];

    // Update existing patient data
    existingPatient.leftEyeImage = leftEyeImage.filename;
    existingPatient.rightEyeImage = rightEyeImage.filename;

    await existingPatient.save();

    res.json({
      message: "Images uploaded and patient data updated successfully",
    });
  } catch (error) {
    console.error("Error saving patient data:", error);
    res
      .status(400)
      .json({ error: error.message || "Failed to save patient data" });
  }
});

module.exports = router;
