import Contact from "../db/models/Contact.js";

// ✅✅✅ DÜZELTİLMİŞ HALİ:
export const getAllContacts = async (userId, queryParams = {}) => {
  console.log('📞 getAllContacts called with:');
  console.log('  - userId:', userId);
  console.log('  - queryParams:', queryParams);
  
  // queryParams'dan al, userId'den DEĞİL!
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = queryParams;  // ✅ queryParams'dan al
  
  const pageNumber = parseInt(page, 10);
  const perPageNumber = parseInt(perPage, 10);
  const skip = (pageNumber - 1) * perPageNumber;

  // Build filter - KESİNLİKLE userId EKLE
  const filter = { userId: userId }; // ✅ userId filtresi EKLENDİ
  
  if (type) {
    filter.contactType = type;
  }
  if (isFavourite !== undefined) {
    filter.isFavourite = isFavourite === 'true';
  }

  // Build sort
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Get total count
  const totalItems = await Contact.countDocuments(filter);

  // Get contacts
  const contacts = await Contact.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(perPageNumber);

  const totalPages = Math.ceil(totalItems / perPageNumber);
  
  return {
    data: contacts,
    page: pageNumber,
    perPage: perPageNumber,
    totalItems,
    totalPages,
    hasPreviousPage: pageNumber > 1,
    hasNextPage: pageNumber < totalPages,
  };
};

// ✅✅✅ Diğer fonksiyonları da DÜZELT:
export const getContactById = async (contactId, userId) => {
  // Hem contactId hem userId kontrol et
  return await Contact.findOne({ 
    _id: contactId, 
    userId: userId 
  });
};

export const createContact = async (contactData) => {
  console.log('📝 createContact with data:', contactData);
  return await Contact.create(contactData);
};

export const updateContact = async (contactId, updateData, userId) => {
  return await Contact.findOneAndUpdate(
    { 
      _id: contactId, 
      userId: userId  // ✅ userId kontrolü
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export const deleteContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ 
    _id: contactId, 
    userId: userId  // ✅ userId kontrolü
  });
};

// ❌❌❌ BU FONKSİYONU SİL! (Controller'da zaten var)
// export const getAllContactsController = async (req, res) => {
//   return await Contact.getAllContacts(req.user._id); 
// };