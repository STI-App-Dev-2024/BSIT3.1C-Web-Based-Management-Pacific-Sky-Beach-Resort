import expressAsync from 'express-async-handler';
import usersService from '../../services/users/usersService.js'

const getAllUsers = expressAsync(async (req, res, next) => {
  try {
    const response = await usersService.getAllUsers()
    res.json(response)
  } catch (error) {
    throw new Error(error)
  }
})

const registerUser = expressAsync(async (req, res, next) => {
  try {
    const response = await usersService.registerUser(req.body)
    res.json(response)
  } catch (error) {
    throw new Error(error)
  }
})

export {
  getAllUsers,
  registerUser
}
