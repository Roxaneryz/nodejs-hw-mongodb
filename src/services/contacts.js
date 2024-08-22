
import { SORT_ORDER } from '../constants/index.js';
import { Contact } from '../models/contacts.js';

export const getAllContacts = async ({ page = 1, perPage = 10, sortBy = "_id", sortOrder = SORT_ORDER.ASC, filter = {} }) => {

  console.log(filter);

  try {

    const skip = page > 0 ? (page - 1) * perPage : 0;

    const contactQuery = Contact.find();

    if (filter.Type) {
      contactQuery.where("contactType").equals(filter.Type);
    }

    if (typeof filter.isFavourite !== "undefined") {
      contactQuery.where("isFavourite").equals(filter.isFavourite);
    }


    // if (typeof filter.minYear !== "undefined") {
    //   return contactQuery.where("year").gte(filter.minYear);
    // }
    // if (typeof filter.maxYear !== "undefined") {
    //   return (await contactQuery.where("year")).filter(filter.maxYear);
    //  }

  const [count, contacts] = await Promise.all([
    Contact.countDocuments(contactQuery), contactQuery.sort({ [sortBy]: sortOrder }).skip(skip).limit(perPage),
  ]);


  const totalPages = Math.ceil(count / perPage);
        return {
          data: contacts,
          page,
          perPage,
          totalItems: count,
          totalPages,
          hasPreviousPage: page > 1,
          hasNextPage: totalPages - page > 0,
        };

    // const contacts = await Contact.find({});
    // return contacts;



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
  const result = await Contact.findOneAndUpdate({_id:id}, contact, {new:true});
  return result;

};
export const deleteContactService = async (id) => {

  const result = await Contact.findByIdAndDelete(id);
  return result;
};