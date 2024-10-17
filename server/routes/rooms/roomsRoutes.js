import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
} from "../../controllers/rooms/roomsControllers.js";

const router = express.Router();

router.get("/", getAllRooms);
router.delete("/:roomID", deleteRoom)
router.post("/create-room", createRoom);

export default router;