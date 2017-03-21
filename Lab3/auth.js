const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const keygen = require("generate-key");
const models = require('./models')();
const secret = "$329239dksdkdjkw" 
const auth = {}

module.exports = auth;

const response = (status, message, data=undefined) => {
  return { status, message, data };
}

/**
 * Generate a new token
 * @param user A user object.
 */
auth.generateToken = (user) => {
  return jwt.sign({ user, expiry: "10h"}, secret);
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

/**
 * Guards end point using JWT.
 */
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

/**
 * Guards endpoint using HMAC Authentication.
 */
auth.guardEndpointHMAC = (req, res, next) => {
  const authorization = req.headers['authorization'];
  const components = auth.parseHMACHeader(authorization);
  const accesskey = components.key;
  const clientSignature = components.signature;
  const query = 'select sharedsecret from users where accesskey = :accesskey';
  models.sequelize.query(query, { replacements: { accesskey }})
    .then(result => {
      if (result[0].length == 0) {
        res
          .status(401)
          .json(response('Failed', 'Failed Authentication'))
      } else {
        const sharedsecret = result[0][0].sharedsecret;
        let serverSignature;
        
        if (req.body === {}) { // check if body exists.
          serverSignature = 
          crypto.createHmac("sha256", sharedsecret)
            .update(String(req.body) + req.url + accesskey)
            .digest("hex");
        } else {
          serverSignature = 
          crypto.createHmac("sha256", sharedsecret)
            .update(req.url + accesskey)
            .digest("hex");
        }
        if (clientSignature === serverSignature) {
          next();
        } else {
          res
            .status(401)
            .json(response('Failed', 'Failed Authentication'))
        }
      }
    });
}

auth.parseHMACHeader = (header) => {
  const components = header.split(' ');
  const key = components[1].replace('Key=', '');
  const signature = components[2].replace('Signature=', '');
  return { key, signature };
}

auth.keyGen = (bits) => { return keygen.generateKey(bits/16);};