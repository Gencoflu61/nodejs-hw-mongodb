import createError from 'http-errors';

export const authenticate = async (req, res, next) => {
  try {
    console.log('🔐 Authenticate middleware çalıştı');
    console.log('Authorization Header:', req.headers.authorization);
    
    // ✅✅✅ TEST MODU: Geçici olarak her zaman başarılı olsun
    // Bu sayede diğer kodları test edebiliriz
    req.user = {
      _id: 'test_user_id_123',  // Test kullanıcı ID'si
      email: 'test@test.com'
    };
    
    console.log('✅ Test user atandı:', req.user);
    next(); // ✅ Bir sonraki middleware'e geç
    
    /*
    // ❌❌❌ BUNU ŞİMDİLİK YORUM SATIRI YAPIN:
    return next(createError(401, 'Authenticate çalışıyor - Token gerekli'));
    */
    
  } catch (error) {
    next(error);
  }
};