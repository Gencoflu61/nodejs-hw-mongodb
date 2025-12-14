import createError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db/models/User.js';
import Session from '../db/models/Session.js';


export const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError(409, 'Email in use');
  }
  
 
  const hashedPassword = await bcrypt.hash(password, 10);
  
  
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });
  
  
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
  
  
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, 'Email or password is wrong');
  }
  
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createError(401, 'Email or password is wrong');
  }
  
 
  await Session.deleteMany({ userId: user._id });
  
  
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId: user._id, type: 'refresh' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  );
  

  const accessTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 dakika
  const refreshTokenExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 gün
  
  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: accessTokenExpiry,
    refreshTokenValidUntil: refreshTokenExpiry
  });
  

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 
  });
  
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken }
  });
};


export const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (!refreshToken) {
    throw createError(401, 'Refresh token not found');
  }
  

  const session = await Session.findOne({ refreshToken });
  if (!session) {
    throw createError(401, 'Invalid refresh token');
  }
  

  if (new Date() > session.refreshTokenValidUntil) {
    await Session.deleteOne({ _id: session._id });
    throw createError(401, 'Refresh token expired');
  }
  
  
  await Session.deleteOne({ _id: session._id });
  
  
  const user = await User.findById(session.userId);
  
  const newAccessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
  );
  
  const newRefreshToken = jwt.sign(
    { userId: user._id, type: 'refresh' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  );
  
  const accessTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
  const refreshTokenExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  
  await Session.create({
    userId: user._id,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: accessTokenExpiry,
    refreshTokenValidUntil: refreshTokenExpiry
  });
  
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });
  
  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: newAccessToken }
  });
};


export const logoutController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (refreshToken) {
    await Session.deleteOne({ refreshToken });
  }
  
  res.clearCookie('refreshToken');
  
  res.status(204).end();
};