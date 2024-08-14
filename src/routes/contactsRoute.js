import  { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getContacts, getContactById, createContact, updateContact, deleteContact } from '../controllers/contactsContrl.js';

 const router = Router();

router.get('/contacts', ctrlWrapper (getContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContactById));
router.post('/contacts', ctrlWrapper(createContact));
router.patch('/contacts/:contactId', ctrlWrapper(updateContact));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContact));


export default router;


// jsonParser;