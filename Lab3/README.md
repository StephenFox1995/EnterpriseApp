### Part 1
Implement a users table having a username and hashed password fields. Use the postgresql crypt() and gen_salt() functions to implement the password hashing

#### Solution
```javascript
// use crypt and gen_salt()
const insert = "INSERT INTO users (email, password, username) VALUES \
(:email, crypt(:password, gen_salt('bf', 8)), :username);";
models.sequelize.query(insert, { replacements: { email, password, username } })
    .then(() => {
        res.send(response("Sucess", "Successfully registered"))
    });
```

### Part 2
Implement a JWT-secured version of the API based on the users table from the previous step. Your solution will implement the following API extensions

A (pre-authentication) login API call which accepts a username and password and returns (if successful) a JWT with a set of claims. The claims should include, minimally, the user id and an 
expiry timestamp

#### solution

First register.
```javascript
app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const insert = "INSERT INTO users (email, password, username) VALUES \
    (:email, crypt(:password, gen_salt('bf', 8)), :username);";
  models.sequelize.query(insert, { replacements: { email, password, username } }).then(() => {
    res.send(response("Sucess", "Successfully registered"))
  });
});
```

Request
```bash
curl -X POST -H "Content-Type: application/json" -d '{
	"username": "steve",
	"email": "stephen@hotmail.com",
	"password": "password1234"
}' "http://localhost:3000/register"
```

Response
```bash
{"status": "Sucess", "message": "Successfully registered"}
```

Then login.
```javascript
auth.generateToken = (user) => {
  return jwt.sign({ user, expiry: "10h"}, secret);
}

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = 'SELECT * FROM users WHERE email = lower(:email) AND \
    password = crypt(:password, password);';
  models.sequelize.query(query, { replacements: { email, password } })
    .then((result) => {
      if (result[0].length == 0) {
        res
        .status(401)
        .json(response('Failed', 'Incorrect password or email'))
      } else {
        const token = auth.generateToken(result[0][0])
        res.send(response('Sucess', 'Successful Authentication', {
          'token': token
        }))
      }
    })
    .catch(() => {
      res
        .status(401)
        .json(response('Failed', 'Incorrect password or email'))
    });
});
```
Request
```bash
curl -X POST -H "Content-Type: application/json" -d '{
        "email": "stephen@hotmail.com",
        "password": "password1234"
}' "http://localhost:3000/login"
```

Response
```json
{
    "status": "Sucess", 
    "message": "Successful Authentication", 
    "data":{
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ4M2JmOGI0LTZlYjItNDUwYy04YjVhLTllYzQ2NDY0YTFmMyIsImVtYWlsIjoic3RlcGhlbkBob3RtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JEZHWW15bHF3V0w2NndibzZ2NC5CRnVkV0k4dlZMWUZRUS5kWksucVJwSHpZUUVKdVZrN0lxIiwidXNlcm5hbWUiOiJzdGV2ZSIsImFjY2Vzc2tleSI6bnVsbCwic2hhcmVkc2VjcmV0IjpudWxsLCJpYXQiOjE0ODk5NTU2OTd9.fq11UV9JoFVuGErVu565TzE_MTZCMKKKzyzl8eKK9QQ"
    }
}
```


* A mechanism to verify client tokens as bearer tokens in a HTTP Authorization header field

```javascript
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

// parse bearer token from header
auth.getBearerToken = (authHeader) => {
   return authHeader.split(' ')[1] || null;
}

auth.verifyToken = (token) => {
  try {
    var decoded = jwt.verify(token, secret);
    return true;
  } catch(err) {
    return false;
  }
}
```


* Authentication should be applied, minimally, to any API calls which update the courts systems models; Token validation should be performed on all API calls
Assume the client has a priori knowledge of the password

```javascript
// verify tokens on each call to the courts endpoint.
app.all('/court/*', auth.guardEndpoint);
```

If authenticated or validated, the API return code should be in the 2xx range, otherwise 401.

```json
{
  "status": "Failed",
  "message": "Invalid token"
}
```

### Part 3

#### solution
Extend the users table or add another apikeys table to include an access key (160 bits) and secret key (320 bits)

![screenshot](/Lab3/assets/usersextended.png)

### Part 4
Implement a Hash-based message authentication scheme to secure the API. In your solution you should include the following API message contents as part of the hashed/signed component:

Message body (if any)
Access key (prepended or appended as you choose)
Query parameters (if any)

If authenticated, the API return code should be in the 2xx range, otherwise 401.

#### solution
First register to get shared secret and access token.

Request
```bash
curl -X POST -H "Content-Type: application/json" -d '{
	"username": "neil_pe",
	"password": "pass1234",
	"email": "neilpel@gmail.com"
}' "http://localhost:3000/hmac/register"
```

Request
```json
{
  "status": "Sucess",
  "message": "Successfully registered",
  "data": {
    "accessKey": "Tb4TKReOmN",
    "sharedSecret": "TioIMNxvEnpTeahx5k3y"
  }
}
```

For clients, run the command `node clienthmac.js` to generate Authorization header containing a HMAC, inlcuding the query params, body and access key in the HMAC.

```bash
node clienthmac.js --accesskey 'Tb4TKReOmN' --secret TioIMNxvEnpTeahx5k3y --url '/hmacauth/test' --httpbody '{"message": "attack at dawn"}'

Authorization: HMAC-SHA256 Key=Tb4TKReOmN Signature=0e5f31b408f59bc75b3b5e5433c687d3e81d5f78b0791ed13845ab5558b00485
```

Send a request with the generated HMAC
```bash
curl -X GET -H "Authorization: HMAC-SHA256 Key=Tb4TKReOmN Signature=530206d0c4c557ab723cf6b3d35ecb78269ec901484cf5d709b245593e06d3e3" "http://localhost:3000/hmacauth/test"
```

If success
```json
{
  "status": "Success",
  "message": "Authentication via HMAC successful"
}
```
else
```json
{
  "status": "Failed",
  "message": "Failed Authentication"
}
```

The code to check the HMAC, checks the body, url and accesstoken.
```javascript
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
// check if hmacs match
if (clientSignature === serverSignature) {
  next();
} else {
  res
    .status(401)
    .json(response('Failed', 'Failed Authentication'))
}
```

