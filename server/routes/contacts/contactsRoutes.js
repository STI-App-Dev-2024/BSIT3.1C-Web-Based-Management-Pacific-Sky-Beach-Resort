import express from "express";
import {
  createContact,
  getAllContactsByUserId,
  getSingleByContactId,
  deleteContact,
  editContactByContactId
} from '../../controllers/contacts/contactsControllers.js'
import createUploadMiddleware from '../../middleware/multer/uploadMiddleware.js'
import { protect } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/single/:contactId', protect, getSingleByContactId)
router.get('/:userId', protect, getAllContactsByUserId)
router.delete('/:contactId', protect, deleteContact)
router.post('/',
  protect,
  createUploadMiddleware({
    folder: 'contacts_avatar',
    fields: [
      { name: 'avatar', maxCount: 1 },
    ],
  }),
  createContact
)
router.put('/:contactId',
  protect,
  createUploadMiddleware({
    folder: 'contacts_avatar',
    fields: [
      { name: 'avatar', maxCount: 1 },
    ],
  }),
  editContactByContactId
)

export default router