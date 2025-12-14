import express from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { contactSchema, contactUpdateSchema } from '../schemas/contactSchemas.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(getAllContactsController));
router.get('/:contactId', authenticate, ctrlWrapper(getContactByIdController));
router.post('/', authenticate, ctrlWrapper(createContactController));
router.patch('/:contactId', authenticate, ctrlWrapper(updateContactController));
router.delete('/:contactId', authenticate, ctrlWrapper(deleteContactController));

export default router;
