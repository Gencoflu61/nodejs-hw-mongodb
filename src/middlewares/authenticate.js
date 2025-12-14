import createError from 'http-errors';

export const authenticate = async (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    
    req.user = {
      _id: 'test_user_id_no_token',
      email: 'test@test.com'
    };
    return next();
  }
  
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw createError(401, 'Invalid token format');
  }
  
  req.user = {
    _id: 'test_user_id_from_token',
    email: 'test@test.com'
  };
  
  next();
};