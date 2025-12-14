// getAllContactsController - DÜZELT
export const getAllContactsController = async (req, res) => {
  // req.user._id VE req.query gönder
  const result = await getAllContacts(req.user._id, req.query);
  
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: result,  // result zaten pagination verisi içeriyor
  });
};

// getContactByIdController - DÜZELT  
export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id); // ✅ userId ekle

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

// updateContactController - DÜZELT
export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body, req.user._id); // ✅ userId ekle

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

// deleteContactController - DÜZELT
export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id); // ✅ userId ekle

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).end();
};