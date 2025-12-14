import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from '../services/contact.js';


export const createContactController = async (req, res) => {
  const contactData = {
    ...req.body,
    userId: req.user._id  
  };
  
  const newContact = await createContact(contactData);
  
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact
  });
};

export const getAllContactsController = async (req, res) => {
  const result = await getAllContacts(req.user._id, req.query);
  
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: result
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);
  
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body, req.user._id);
  
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);
  
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  
  res.status(204).end();
};