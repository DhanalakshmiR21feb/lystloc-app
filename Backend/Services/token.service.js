const jwt = require("jsonwebtoken");
const config = require("../Config/config");
const { tokenTypes } = require("../Config/token");

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: expires,
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Generate auth token
 * - Generate jwt token
 * - Token type should be "ACCESS"
 * - Return token and expiry date in required format
 *
 */
const generateAuthTokens = async () => {
  const accessTokenExpires =
    Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;

  const accessToken = generateToken(
   
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  return {
    access: {
      token: accessToken,
      expires: new Date(accessTokenExpires * 1000),
    },
  };
  
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
