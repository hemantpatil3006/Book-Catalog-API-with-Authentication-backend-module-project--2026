const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CustomError = require('../utils/customError');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      if (!token) {
        throw new CustomError('Not authorized, no token provided', 401);
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        throw new CustomError('Not authorized, user not found', 401);
      }

      next();
    } catch (err) {
      if (err instanceof CustomError) {
        return next(err);
      }
      next(new CustomError('Not authorized, token failed', 401));
    }
  } else {
    next(new CustomError('Not authorized, no token', 401));
  }
};

module.exports = { protect };
