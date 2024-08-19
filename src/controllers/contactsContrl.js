import createHttpError from 'http-errors';
import { getAllContacts, getContactByIdDB, createContactService, updateContactService, deleteContactService } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContacts = async (req, res) => {

  const { page, perPage } = parsePaginationParams(req.query);
parseSortParams(req.query);

    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });

};

export const getContactById = async (req, res, next) => {
  let contactId;

    contactId = req.params.contactId;
    const contact = await getContactByIdDB(contactId);

   if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  };


    res.status(200).send({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });



};


export const createContact = async (req, res) => {
  console.log(req.params);


  const result = await createContactService(req.body);

  res.status(201).send({ status: 201, message: "Successfully created a contact!", data: result});
};

export const updateContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await updateContactService(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  };

  res.status(200).send({
    status: 200,
    message: "Successfully patched a contact!",
    data: result
  });
};

export const deleteContact = async (req, res,next) => {
  const contactId = req.params.contactId;
  const result = await deleteContactService(contactId);
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
}

  res.status(204).send();


};