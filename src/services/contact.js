import Contact from "../db/models/Contact.js";

export const getAllContacts = async (userId) => {
  console.log('getAllContacts userId:', userId);
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = userId;
  const pageNumber = parseInt(page, 10);
  const perPageNumber = parseInt(perPage, 10);
  const skip = (pageNumber - 1) * perPageNumber;

  // Build filter
  const filter = {};
  if (type) {
    filter.contactType = type;
  }
  if (isFavourite !== undefined) {
    filter.isFavourite = isFavourite === 'true';
  }
  if (userId) {
    filter.userId = userId;
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
  
  return  {
    data: contacts,
    page: pageNumber,
    perPage: perPageNumber,
    totalItems,
    totalPages,
    hasPreviousPage: pageNumber > 1,
    hasNextPage: pageNumber < totalPages,
    userId: userId
  };
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const updateContact = async (contactId, updateData) => {
  return await Contact.findByIdAndUpdate(contactId, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};
export const getAllContactsController = async (req, res) => {
  return await Contact.getAllContacts(req.user._id); 
};