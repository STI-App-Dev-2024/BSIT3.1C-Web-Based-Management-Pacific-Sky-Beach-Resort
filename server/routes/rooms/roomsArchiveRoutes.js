import express from "express"; 
import {
    getAllRoomsArchive,
    getSingleRoomArchiveById,
    deleteRoomArchive,
    restoreRoomArchive
} from "../../controllers/rooms/roomsArchiveController.js";

const router = express.Router();

router.get("/", getAllRoomsArchive);
router.get("/:roomId", getSingleRoomArchiveById);
router.delete("/:roomId", deleteRoomArchive);
router.post("/restore-room/:roomId", restoreRoomArchive); 

export default router;