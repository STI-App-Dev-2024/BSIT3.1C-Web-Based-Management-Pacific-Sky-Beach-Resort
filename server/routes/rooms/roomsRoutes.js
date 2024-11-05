import express from "express";
import {
  createRoom,
  getSingleRoomById,
  deleteRoom,
  getAllRooms,
} from "../../controllers/rooms/roomsControllers.js";

const router = express.Router();

router.get("/", getAllRooms);
router.get("/:roomId", getSingleRoomById);
router.delete("/:roomId", deleteRoom)
router.post("/create-room", createRoom);

export default router;