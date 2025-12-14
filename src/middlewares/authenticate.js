import createError from 'http-errors';

export const authenticate = async (req, res, next) => {
  console.log('🔐 authenticate middleware ÇALIŞTI');
  console.log('Authorization header:', req.headers.authorization);
  
  // TEST: Her zaman hata verelim ki çalıştığını görelim
  return next(createError(401, 'Authenticate çalışıyor - Token gerekli'));
  
  /*
  // Normal kod (şimdilik comment'te):
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createError(401, 'Unauthorized - No token provided'));
  }
  
  // Geçici: Her token'ı kabul et (test için)
  req.user = {
    _id: 'test_user_id_from_token',
    email: 'test@test.com'
  };
  
  next();
  */
};