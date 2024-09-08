import  { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getContacts, getContactById, createContact, updateContact, deleteContact } from '../controllers/contactsContrl.js';
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateID } from "../middlewares/validateID.js";
import { authenticate } from '../middlewares/auth.js';
import { upload } from "../middlewares/upload.js";

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper (getContacts));
router.get('/:contactId', validateID, ctrlWrapper(getContactById));


router.post(
  '/', upload.single("photo"),
  validateBody(createContactSchema),
  ctrlWrapper(createContact),
);
router.patch('/:contactId',upload.single("photo"), validateID, validateBody(updateContactSchema), ctrlWrapper(updateContact));
router.delete('/:contactId', validateID, ctrlWrapper(deleteContact));


export default router;


// jsonParser;