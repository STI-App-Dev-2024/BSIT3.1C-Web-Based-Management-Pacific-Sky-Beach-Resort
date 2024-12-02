import expressAsync from 'express-async-handler';
import usersArchiveService from '../../services/users/usersArchiveService.js'

const getAllArchivedUsers = expressAsync(async (req, res) => {
    try {
        const response = await usersArchiveService.getAllArchivedUsers()
        res.json(response)
    } catch (error) {
        throw new Error(error)
    }
    });

const getSingleArchivedUserById = expressAsync(async (req, res) => {
    try {
        const response = await usersArchiveService.getSingleArchivedUserById(req.params.userId)
        res.json(response)
    } catch (error) {
        throw new Error(error)
    }
});

const deleteArchivedUser = expressAsync(async (req, res) => {
    try {
        const response = await usersArchiveService.deleteArchivedUser(req.params.userId)
        res.json(response)
    } catch (error) {
        throw new Error(error)
    }
});

const restoreArchivedUser = expressAsync(async (req, res) => {
    try {
        const response = await usersArchiveService.restoreArchivedUser(req.params.userId)
        res.json(response)
    } catch (error) {
        throw new Error(error)
    }
});

export {
    getAllArchivedUsers,
    getSingleArchivedUserById,
    deleteArchivedUser,
    restoreArchivedUser
}