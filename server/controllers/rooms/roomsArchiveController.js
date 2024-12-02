import expressAsync from "express-async-handler";
import roomsArchiveService from "../../services/rooms/roomsArchiveService.js";

const getAllRoomsArchive = expressAsync(async (req, res, next) => {
    try {
        const response = await roomsArchiveService.getAllRoomsArchive();
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const getSingleRoomArchiveById = expressAsync(async (req, res, next) => {
    try {
        const response = await roomsArchiveService.getSingleRoomArchiveById(req.params.roomId);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteRoomArchive = expressAsync(async (req, res, next) => {
    try {
        const response = await roomsArchiveService.deleteRoomArchive(req.params.roomId);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

const restoreRoomArchive = expressAsync(async (req, res, next) => {
    try {
        const response = await roomsArchiveService.restoreRoom(req.params.roomId);
        res.json(response);
    } catch (error) {
        throw new Error(error);
    }
});

export {
    getAllRoomsArchive,
    getSingleRoomArchiveById,
    deleteRoomArchive,
    restoreRoomArchive
}