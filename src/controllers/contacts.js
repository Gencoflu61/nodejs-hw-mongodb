// src/controllers/contacts.js TAM YAPISI:

// 1. Imports (en üstte)
import createError from 'http-errors';
import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from '../services/contact.js';
// 2. createContactController (EN ÖNEMLİ - EKSİK OLAN)
export const createContactController = async (req, res) => {
  const userId = req.user ? req.user._id : 'test_user_id';
  const contactData = { ...req.body, userId };
  const contact = await createContact(contactData);
  
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

// 3. getAllContactsController
export const getAllContactsController = async (req, res) => {
  const result = await getAllContacts(req.user._id, req.query);
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: result,
  });
};

// 4. getContactByIdController
export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);
  if (!contact) throw createError(404, 'Contact not found');
  res.status(200).json({ status: 200, message: `Successfully found contact with id ${contactId}!`, data: contact });
};

// 5. updateContactController
export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body, req.user._id);
  if (!contact) throw createError(404, 'Contact not found');
  res.status(200).json({ status: 200, message: 'Successfully patched a contact!', data: contact });
};

// 6. deleteContactController
export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);
  if (!contact) throw createError(404, 'Contact not found');
  res.status(204).end();
};

// 7. Exports (en altta - OTOMATİK zaten export const yaptık)
// Eğer altta ayrıca export yapıyorsanız:
// export { createContactController, getAllContactsController, ... }