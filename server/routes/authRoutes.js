const express = require("express");
const jwt = require("jsonwebtoken");
const EmployeeModel = require("../models/employee");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const bcrypt = require("bcrypt");

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body.data;
    const user = await EmployeeModel.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({ status: "error", message: "User doesn't exist." });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      return res.status(200).json({
        status: "success",
        message: "You have successfully logged in.",
        token: token,
      });
    } else {
      return res
        .status(200)
        .json({ status: "error", message: "Password is incorrect." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "An error occurred.", error: error });
  }
});

// Logout Route
router.get("/logout", verifyToken, (req, res) => {
  const tokenValue = req.headers["authorization"].split(" ")[1];
  verifyToken.addToBlacklist(tokenValue);
  res.status(200).json({ message: "Logout successful." });
});

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body.data;

    // Check if the email already exists
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the salt rounds

    // If the email is unique, create the user
    const newUser = await EmployeeModel.create({
      ...req.body.data,
      password: hashedPassword,
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
