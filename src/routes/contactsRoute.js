import  { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getContacts, getContactById, createContact, updateContact, deleteContact } from '../controllers/contactsContrl.js';
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateID } from "../middlewares/validateID.js";

 const router = Router();

router.get('/contacts', ctrlWrapper (getContacts));
router.get('/contacts/:contactId', validateID, ctrlWrapper(getContactById));
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContact),
);
router.patch('/contacts/:contactId',validateID, validateBody(updateContactSchema), ctrlWrapper(updateContact));
router.delete('/contacts/:contactId', validateID, ctrlWrapper(deleteContact));


export default router;


// jsonParser;