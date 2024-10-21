import expressAsync from 'express-async-handler';
import usersService from '../../services/users/usersService.js'

const authUser = expressAsync(async (req, res) => {
  const { email, password } = req.body
  try {
    const response = await usersService.authUser(email, password)
    res.send(response)
  } catch (error) {
    throw new Error(error)
  }
})

const getAllUsers = expressAsync(async (req, res) => {
  try {
    const response = await usersService.getAllUsers()
    res.json(response)
  } catch (error) {
    throw new Error(error)
  }
})

const registerUser = expressAsync(async (req, res) => {
  try {
    const response = await usersService.registerUser(req.body)
    res.json(response)
  } catch (error) {
    throw new Error(error)
  }
})

const deleteUser = expressAsync(async (req, res) => {
  try {
    const response = await usersService.deleteUser(req.params.userID)
    res.json(response)
  } catch (error) {
    console.error('Error in usersService:', error);
    throw new Error(error)
  }
})

export {
  authUser,
  getAllUsers,
  registerUser,
  deleteUser
}
