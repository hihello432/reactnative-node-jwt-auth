const express = require("express");
const EmployeeModel = require("../models/employee");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// Get User Data Route
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await EmployeeModel.findOne({ email: req.user.email });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found." });
    }

    return res.status(200).json({
      status: "success",
      message: "User info retrieved successfully.",
      user: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "An error occurred.", error: error });
  }
});

module.exports = router;
