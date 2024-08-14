import { Contact } from '../models/conatcts.js';

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find({});
    return contacts;
  } catch (error) {
    console.error('Error while fetching contacts:', error);
    throw new Error('Failed to retrieve contacts');
  }
};

export const getContactByIdDB = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    console.error(`Error while fetching contact with id ${id}:`, error);
    throw new Error('Error while fetching contact');
  }
};


export const createContactService = async (contact) => {
  const result = await Contact.create(contact);
  return result;

};
export const updateContactService = async (id, contact) => {
  const result = await Contact.findByIdAndUpdate(id, contact);
  return result;

};
export const deleteContactService = async (id) => {

  const result = await Contact.findByIdAndDelete(id);
  return result;
};