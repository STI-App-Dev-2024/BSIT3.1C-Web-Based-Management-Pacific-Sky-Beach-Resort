import express from 'express'
import {
  deleteUser,
  getAllUsers,
  registerUser,
  authUser
} from '../../controllers/users/usersControllers.js'
import {
  checkIfEmailAddressExist,
  authToAddUser
} from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getAllUsers)
router.delete('/:userID', deleteUser)
router.post('/login', authUser)
router.post('/register', authToAddUser, checkIfEmailAddressExist, registerUser)

export default router