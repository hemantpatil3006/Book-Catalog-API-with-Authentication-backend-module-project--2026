const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { success } = require('../utils/responseHandler');
const CustomError = require('../utils/customError');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);

    if (!user) {
      return next(new CustomError('Invalid user data', 400));
    }

    success(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    }, 'User registered successfully', 201);
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser(email, password);

    if (!user) {
      throw new CustomError('Invalid email or password', 401);
    }

    success(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
