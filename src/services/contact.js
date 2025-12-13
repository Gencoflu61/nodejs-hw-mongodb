import Contact from "../db/models/Contact.js";

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    console.log(`Found ${contacts.length} contacts in database`);
    console.log(`Collection name: ${Contact.collection.name}`);
    console.log(`Database name: ${Contact.db.databaseName}`);
    if (contacts.length === 0) {
      console.warn('⚠️ No contacts found! Check if data exists in MongoDB collection "contacts"');
    }
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export  const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};
