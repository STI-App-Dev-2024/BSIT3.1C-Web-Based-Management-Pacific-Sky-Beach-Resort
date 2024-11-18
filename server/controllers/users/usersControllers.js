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

const getSingleUserById = expressAsync(async (req, res) => {
  try {
    const response = await usersService.getSingleUserById(req.params.userId)
    res.json(response)
  } catch (error) {
    throw new Error(error)
  }
})

const registerUser = expressAsync(async (req, res) => {
  try {
    const response = await usersService.registerUser(req)
    res.json(response)
  } catch (error) {
    throw new Error(error)
  }
})

const updateUser = expressAsync(async (req, res) => {
  try {
    const response = await usersService.updateUser(req)
    res.json(response)
  } catch (error) {
    console.error('Error in usersService:', error);
    throw new Error(error)
  }
})

const deleteUser = expressAsync(async (req, res) => {
  try {
    const response = await usersService.deleteUser(req.params.userId)
    res.json(response)
  } catch (error) {
    console.error('Error in usersService:', error);
    throw new Error(error)
  }
})

const changePassword = expressAsync(async (req, res) => {
  try {
    const response = await usersService.changePassword(req.body)
    res.json(response)
  } catch (error) {
    console.error('Error in usersService:', error);
    throw new Error(error)
  }
})

export {
  authUser,
  getAllUsers,
  getSingleUserById,
  registerUser,
  updateUser,
  deleteUser,
  changePassword
}
