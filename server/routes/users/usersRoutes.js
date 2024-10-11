import express from 'express'
import {
  deleteUser,
  getAllUsers,
  registerUser
} from '../../controllers/users/usersControllers.js'

const router = express.Router()

router.get('/', getAllUsers)
router.delete('/:userID', deleteUser)
router.post('/register', registerUser)

export default router