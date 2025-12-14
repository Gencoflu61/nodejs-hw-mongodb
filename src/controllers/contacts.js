import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contact.js';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts(req.user._id);
  const result = await getAllContacts(req.query);
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: result,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  console.log('req.user:', req.user); // Debug için
  
  // Eğer authenticate çalışmıyorsa, test için sabit ID
  const userId = req.user ? req.user._id : 'test_user_id_123';
  
  const contactData = {
    ...req.body,
    userId: userId  // ✅ KESİNLİKLE EKLE
  };
  
  console.log('contactData:', contactData); // Debug
  
  const contact = await createContact(contactData);
  
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).end();
};
