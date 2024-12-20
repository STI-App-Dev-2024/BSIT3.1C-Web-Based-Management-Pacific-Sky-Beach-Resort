import express from 'express'
import {
  deleteUser,
  getAllUsers,
  registerUser,
  authUser,
  updateUser,
  getSingleUserById,
  changePassword,
  archiveUser
} from '../../controllers/users/usersControllers.js'
import {
  checkIfEmailAddressExist,
  authToManageUsers,
  protect
} from '../../middleware/authMiddleware.js'
import createUploadMiddleware from '../../middleware/multer/uploadMiddleware.js'

const router = express.Router()

router.get('/', authToManageUsers, getAllUsers)
router.get('/:userId', getSingleUserById)
router.delete('/:userId', authToManageUsers, deleteUser)
router.post('/login', authUser)
router.post(
  '/register',
  checkIfEmailAddressExist,
  createUploadMiddleware({
    folder: 'user_avatars',
    fields: [
      { name: 'avatar', maxCount: 1 },
    ],
  }),
  registerUser
)

router.put(`/change-password`, protect, changePassword)

router.put(
  '/:userId',
  protect,
  createUploadMiddleware({
    folder: 'user_avatars',
    fields: [
      { name: 'avatar', maxCount: 1 },
    ],
  }),
  updateUser
)

router.post('/archive-user/:userId', archiveUser)

export default router