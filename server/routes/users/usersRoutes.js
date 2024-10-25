import express from 'express'
import {
  deleteUser,
  getAllUsers,
  registerUser,
  authUser,
  updateUser,
  getSingleUserById
} from '../../controllers/users/usersControllers.js'
import {
  checkIfEmailAddressExist,
  authToManageUsers,
  protect
} from '../../middleware/authMiddleware.js'
import createUploadMiddleware from '../../middleware/multer/uploadMiddleware.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:userId', getSingleUserById)
router.delete('/:userId', authToManageUsers, deleteUser)
router.post('/login', authUser)
router.post(
  '/register',
  authToManageUsers,
  checkIfEmailAddressExist,
  createUploadMiddleware({
    folder: 'user_avatars',
    fieldName: 'avatar',
    uploadType: 'single'
  }),
  registerUser
)
router.put(
  '/:userId',
  protect,
  createUploadMiddleware({
    folder: 'user_avatars',
    fieldName: 'avatar',
    uploadType: 'single'
  }),
  updateUser
)

export default router