import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import Session from '../db/models/Session.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError(401, 'Unauthorized - No token provided');
    }
    
  
    const token = authHeader.split(' ')[1];
    
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    const session = await Session.findOne({
      userId: decoded.userId,
      accessToken: token,
      accessTokenValidUntil: { $gt: new Date() }
    });
    
    if (!session) {
      throw createError(401, 'Access token expired');
    }
    
    req.user = {
      _id: decoded.userId,
      email: decoded.email
    };
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(createError(401, 'Access token expired'));
    } else if (error.name === 'JsonWebTokenError') {
      next(createError(401, 'Invalid token'));
    } else {
      next(error);
    }
  }
};