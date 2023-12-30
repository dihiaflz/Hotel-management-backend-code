const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  try {
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized - Missing Token' });
    }
    const data = jwt.verify(authHeader, process.env.SECRET);
    if (!data.user) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }
    req.user = data.user
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized - Token Expired' });
    }
    console.error('Error during token verification:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
