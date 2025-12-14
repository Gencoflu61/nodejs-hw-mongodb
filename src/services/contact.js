import Contact from "../db/models/Contact.js";

export const getAllContacts = async (userId, queryParams = {}) => {
  console.log('📞 getAllContacts - userId:', userId);
  
  const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc', type, isFavourite } = queryParams;
  
  const filter = { userId }; // Sadece bu kullanıcının contact'ları
  
  if (type) filter.contactType = type;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';
  
  const totalItems = await Contact.countDocuments(filter);
  const contacts = await Contact.find(filter)
    .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
    .skip((page - 1) * perPage)
    .limit(perPage);
  
  return {
    data: contacts,
    page: Number(page),
    perPage: Number(perPage),
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
    hasPreviousPage: page > 1,
    hasNextPage: page < Math.ceil(totalItems / perPage)
  };
};

export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

export const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const updateContact = async (contactId, updateData, userId) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    updateData,
    { new: true, runValidators: true }
  );
};

export const deleteContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};