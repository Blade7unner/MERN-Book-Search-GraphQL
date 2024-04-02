const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Middleware function for authenticated routes
  authMiddleware: function (req, res, next) {
    // Allow token to be sent via req.query, headers, or cookies
    let token = req.query.token || req.headers.authorization || req.cookies.token;

    // Check if token exists and format if sent in headers
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(401).json({ message: 'You are not authorized to access this resource.' });
    }

    // Verify token and extract user data from it
    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
    } catch (error) {
      console.error('Invalid token:', error);
      return res.status(401).json({ message: 'Invalid token.' });
    }

    // Proceed to the next middleware
    next();
  },

  // Function to sign JWT token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
