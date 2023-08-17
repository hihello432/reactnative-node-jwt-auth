const jwt = require("jsonwebtoken");
const blacklistedTokens = [];
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token not provided." });
  }

  const tokenValue = token.split(" ")[1];

  if (blacklistedTokens.includes(tokenValue)) {
    return res.status(401).json({ message: "Token is expired." });
  }

  jwt.verify(tokenValue, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
    req.user = decoded;
    next();
  });
};

// Function to add a token to the blacklist
module.exports.addToBlacklist = (tokenValue) => {
  blacklistedTokens.push(tokenValue);
};
