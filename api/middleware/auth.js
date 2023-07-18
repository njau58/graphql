const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || "";

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.verifiedUser = verified;

    console.log("Verification success!", verified);
    next();
  } catch (error) {

    // throw new Error('Token verification failed')
    console.log("Verification failed.", error);

    next();
  }
};

module.exports = { authenticate };
