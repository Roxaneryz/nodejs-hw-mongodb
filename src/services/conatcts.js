import { Contact } from "../models/conatcts";

export const getAllContacts = async () => {
    try {
      const contacts = await Contact.find({});
      return contacts;
    } catch (error) {
        console.error('Error while fetching contacts:', error);
      throw new Error('Failed to retrieve contacts');
    }
};

export const getConatctByIdDB = async (id) => {
    try {
        const contact = await Contact.findById(id);
        return contact;

    } catch (error) {
        console.error(`Error while fetching contact with id ${id}:`, error);
        throw new Error('Error while fetching contact');
    }
};
