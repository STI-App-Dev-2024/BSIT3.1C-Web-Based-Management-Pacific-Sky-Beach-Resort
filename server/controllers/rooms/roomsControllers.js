import expressAsync from "express-async-handler";
import roomsService from "../../services/rooms/roomsService.js";

const getAllRooms = expressAsync(async (req, res, next) => {
  try {
    const response = await roomsService.getAllRooms();
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const createRoom = expressAsync(async (req, res, next) => {
  try {
    const response = await roomsService.createRoom(req.body);
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteRoom = expressAsync(async (req, res, next) => {
  try {
    const response = await roomsService.deleteRoom(req.params.roomID);
    res.json(response);
  } catch (error) {
    console.error('Error in usersService:', error);
    throw new Error(error);
  }
});

export { getAllRooms, createRoom, deleteRoom };