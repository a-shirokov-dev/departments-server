// const jwt = require('jsonwebtoken');
// const key = require('../keys/keys');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {

    const { token } = req.headers;
    if (!token) {
      res.status(403).json({ message: 'Invalid token'});
    }
    
    req.user = jwt.verify(token, key.jwt);
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: 'Unauthorized user'});
  }
}
