import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getContacts, getContactById } from './controllers/contactsContrl.js';

const router = express.Router();

 router.get('/', ctrlWrapper (getContacts));

 router.get('/:contactId', ctrlWrapper (getContactById));
