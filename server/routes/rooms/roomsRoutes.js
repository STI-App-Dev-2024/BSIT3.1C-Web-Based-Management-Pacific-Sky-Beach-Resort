import express from "express";
import {
  createRoom,
  getSingleRoomById,
  deleteRoom,
  getAllRooms,
} from "../../controllers/rooms/roomsControllers.js";

const router = express.Router();

router.get("/", getAllRooms);
router.get("/:roomID", getSingleRoomById);
router.delete("/:roomID", deleteRoom)
router.post("/create-room", createRoom);

export default router;