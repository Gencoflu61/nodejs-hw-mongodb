import Contact from "../db/models/Contact.js";

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  console.log(`Found ${contacts.length} contacts in database`);
  return contacts;
};

export  const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};
