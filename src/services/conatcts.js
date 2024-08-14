import { Contact } from "../models/conatcts.js";
import mongoose from "mongoose";
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
throw new Error('Invalid Id');
    }
    const contact = await Contact.findById(id);
   

        return contact;

};
