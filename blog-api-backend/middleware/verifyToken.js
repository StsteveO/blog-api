// verifyTokenMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET; // Your JWT secret key

function verifyToken(req, res, next) {
  // console.log("verifyToken function is called")
  const token = req.headers.authorization.split(" ")[1];
  // console.log("was able to get the function early on")
  // console.log(token)

  if (!token) {
    // console.log("no token")
    return res.status(401).json({ message: "Authorization token is missing." });
  }

  // console.log("still have a token")
  // console.log(secretKey)

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // console.log("found token, but something is wrong")
      return res.status(401).json({ message: "Invalid token." });
    }

    // If the token is valid, you can store the user information in the request for later use
    req.user = decoded;
    // console.log("the verification worked!")

    next(); // Continue to the protected route
  });
}

module.exports = verifyToken;
