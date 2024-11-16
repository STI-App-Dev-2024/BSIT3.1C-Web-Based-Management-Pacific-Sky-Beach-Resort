import express from "express";
import {
  createRoom,
  getSingleRoomById,
  deleteRoom,
  getAllRooms,
  editRoom,
} from "../../controllers/rooms/roomsControllers.js";
import createUploadMiddleware from "../../middleware/multer/uploadMiddleware.js";
import { protect } from '../../middleware/authMiddleware.js'

const router = express.Router();

router.get("/", getAllRooms);
router.get("/:roomId", getSingleRoomById);
router.delete("/:roomId", protect, deleteRoom)
router.post(
  '/create-room',
  createUploadMiddleware({
    folder: 'room-images',
    fields: [
      { name: 'pictures', maxCount: 20 },
      { name: 'thumbnail', maxCount: 1 },
    ],
  }),
  createRoom
);
router.put(
  "/:roomId",
  createUploadMiddleware({
    folder: 'room-images',
    fields: [
      { name: 'pictures', maxCount: 20 },
      { name: 'thumbnail', maxCount: 1 },
    ],
  }),
  editRoom
);

export default router;