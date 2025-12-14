import createError from 'http-errors';
import User from '../db/models/User.js';

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    throw createError(400, 'All fields are required');
  }
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError(409, 'Email in use');
  }
  
  const user = await User.create({ name, email, password });
  const userResponse = user.toObject();
  delete userResponse.password;
  
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: userResponse
  });
};


export const loginController = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw createError(400, 'Email and password are required');
  }
  
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, 'Email or password is wrong');
  }
  
  if (user.password !== password) {
    throw createError(401, 'Email or password is wrong');
  }
  
  const testToken = 'test_token_' + Date.now();
  
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: testToken }
  });
};


export const refreshController = async (req, res) => {
  const newToken = 'refreshed_token_' + Date.now();
  
  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: newToken }
  });
};


export const logoutController = async (req, res) => {
  res.status(204).end();
};