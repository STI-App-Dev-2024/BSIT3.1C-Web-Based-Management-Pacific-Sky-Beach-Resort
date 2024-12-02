import express from 'express'
import {
    getAllArchivedUsers,
    getSingleArchivedUserById,
    deleteArchivedUser,
    restoreArchivedUser
} from '../../controllers/users/usersArchiveController.js'

const router = express.Router()

router.get('/', getAllArchivedUsers)
router.get('/:userId', getSingleArchivedUserById)
router.delete('/:userId', deleteArchivedUser)
router.post('/restore-user/:userId', restoreArchivedUser)

export default router