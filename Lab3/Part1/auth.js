const jwt = require('jsonwebtoken');

const secret = "$329239dksdkdjkw" 
const auth = {}

module.exports = auth;
/**
 * Generate a new token
 * @param user A user object.
 */
auth.generateToken = (user) => {
  return jwt.sign(user, secret);
}
/**
 * Verifies a token.
 * @param token The token to verify.
 * @return True - Success, False - Not verified.
 */
auth.verifyToken = (token) => {
  try {
    var decoded = jwt.verify(token, secret);
    return true;
  } catch(err) {
    return false;
  }
}
auth.guardEndpoint = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = auth.getBearerToken(authHeader);
  if (auth.verifyToken(token)) {
    req.token = token;
    next();
  } else {
    res
      .status(401)
      .json({
        'status': 'Failed',
        'message': 'Invalid token',
      })
  }
}

auth.getBearerToken = (authHeader) => {
   return authHeader.split(' ')[1] || null;
}

