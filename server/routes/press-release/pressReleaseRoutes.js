import express from "express";
import {
  createPressRelease,
  deletePressRelease,
  editPressRelease,
  getAllPressRelease,
  getPressReleaseById
} from '../../controllers/press-release/pressReleaseContoller.js'
import createUploadMiddleware from '../../middleware/multer/uploadMiddleware.js'
import { adminAuth } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post('/',
  adminAuth,
  createUploadMiddleware({
    folder: 'press_release_thumbnails',
    fields: [
      { name: 'thumbnail', maxCount: 1 },
    ],
  }),
  createPressRelease
)

router.get('/', getAllPressRelease)
router.get('/:pressReleaseId', getPressReleaseById)
router.delete('/:pressReleaseId', adminAuth, deletePressRelease)

router.put(
  '/:pressReleaseId',
  adminAuth,
  createUploadMiddleware({
    folder: 'press_release_thumbnails',
    fields: [
      { name: 'thumbnail', maxCount: 1 },
    ],
  }),
  editPressRelease
)

export default router