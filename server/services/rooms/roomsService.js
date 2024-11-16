import conn from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";
import undefinedValidator from '../../utils/undefinedValidator.js'

const pool = await conn();

const getAllRooms = async () => {
  try {
    const roomsQuery = `
  SELECT r.roomId, r.roomName, r.userId, r.capacity, r.price, r.thumbnail, r.isOccupied
  FROM rooms r
`;

    const [rooms] = await pool.query(roomsQuery);

    const picturesQuery = `
  SELECT picture FROM roomsPictures WHERE roomId = ?
`;

    const __rooms = await Promise.all(rooms.map(async (room) => {
      const [pictures] = await pool.query(picturesQuery, [room.roomId]);

      return {
        ...room,
        pictures: pictures.map(picture => picture.picture),
      };
    }));

    return __rooms;
  } catch (error) {
    throw new Error(error)
  }
};

const getSingleRoomById = async (roomId) => {
  try {
    const roomQuery = `
      SELECT *
      FROM rooms
      WHERE roomId = ?
    `;

    const [room] = await pool.query(roomQuery, [roomId]);

    if (!room.length) {
      throw new Error('Room not found');
    }

    const bedQuery = `
      SELECT bedType, count FROM roombed WHERE roomId = ?
    `;

    const [bedDetails] = await pool.query(bedQuery, [roomId]);

    const bathroomQuery = `
      SELECT bathRoomType, count FROM roomBathroom WHERE roomId = ?
    `;

    const [bathroomDetails] = await pool.query(bathroomQuery, [roomId]);

    const picturesQuery = `
      SELECT picture FROM roomsPictures WHERE roomId = ?
    `;

    const [pictures] = await pool.query(picturesQuery, [roomId]);

    return {
      ...room[0],
      bedDetails,
      bathroomDetails,
      pictures: pictures.map(picture => picture.picture),
    };
  } catch (error) {
    throw new Error(error);
  }
};

const createRoom = async (req) => {
  try {
    const {
      roomName,
      userId,
      capacity,
      roomType,
      price,
      bedDetails,
      description
    } = req.body || {};

    const parsedBedDetails = JSON.parse(bedDetails)

    const roomId = uuidv4();
    const pictures = req.files?.pictures ? req.files.pictures.map(file => file.path) : [];
    const thumbnail = req.files?.thumbnail ? req.files.thumbnail[0].path : null;

    const roomQuery = `
      INSERT INTO rooms(roomId, userId, roomName, capacity,description, roomType, price, thumbnail, isOccupied)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(roomQuery, [
      roomId,
      userId,
      roomName,
      capacity,
      description,
      roomType,
      price,
      thumbnail,
      false,
    ]);

    const roomBedQuery = `
      INSERT INTO roombed(roomId, bedType, count) VALUES (?, ?, ?)
    `;
    for (const bed of parsedBedDetails) {
      const { bedType, bedCount } = bed;
      await pool.query(roomBedQuery, [roomId, bedType, bedCount]);
    }

    const roomPicturesQuery = `
      INSERT INTO roomsPictures(roomId, picture) VALUES (?, ?)
    `;
    for (const picture of pictures) {
      await pool.query(roomPicturesQuery, [roomId, picture]);
    }

    return { message: 'Room created successfully', roomId };
  } catch (error) {
    throw new Error(error.message);
  }
};

const editRoom = async (req) => {
  try {
    const {
      roomId,
      roomName,
      userId,
      capacity,
      roomType,
      price,
      bedDetails,
      description,
    } = req.body || {};

    const room = await getSingleRoomById(req.params.roomId);

    const pictures = req.files?.pictures ? req.files.pictures.map(file => file.path) : [];
    const thumbnail = req.files?.thumbnail ? req.files.thumbnail[0].path : null;

    const roomQuery = `
      UPDATE rooms
      SET 
        roomName = ?, 
        capacity = ?, 
        description = ?, 
        roomType = ?, 
        price = ?, 
        thumbnail = ?
      WHERE roomId = ?
    `;

    room.roomName = undefinedValidator(room.roomName, roomName);
    room.capacity = undefinedValidator(room.capacity, capacity);
    room.description = undefinedValidator(room.description, description);
    room.roomType = undefinedValidator(room.roomType, roomType);
    room.price = undefinedValidator(room.price, price);

    let __thumbnail;
    if (req.files?.thumbnail) {
      __thumbnail = thumbnail;
    } else {
      __thumbnail = room.thumbnail;
    }

    await pool.query(roomQuery, [
      room.roomName,
      room.capacity,
      room.description,
      room.roomType,
      room.price,
      __thumbnail,
      room.roomId
    ]);

    const oldBedDetails = JSON.stringify(room.bedDetails)
    const newBedDetails = JSON.stringify(bedDetails)

    const __bedDetails = undefinedValidator(oldBedDetails, newBedDetails)
    const parsedBedDetails = JSON.parse(__bedDetails)

    const roomBedQuery = `
    INSERT INTO roombed(roomId, bedType, count) VALUES (?, ?, ?)
  `;
    for (const bed of parsedBedDetails) {
      const { bedType, count } = bed;
      await pool.query(roomBedQuery, [roomId, bedType, count]);
    }

    // Update room pictures if provided
    if (pictures.length > 0) {
      const roomPicturesDeleteQuery = `
        DELETE FROM roomsPictures WHERE roomId = ?
      `;
      await pool.query(roomPicturesDeleteQuery, [roomId]);

      const roomPicturesQuery = `
        INSERT INTO roomsPictures(roomId, picture) VALUES (?, ?)
      `;
      for (const picture of pictures) {
        await pool.query(roomPicturesQuery, [roomId, picture]);
      }
    }

    return { message: 'Room updated successfully', roomId };

  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteRoom = async (roomId) => {
  try {
    await pool.query('START TRANSACTION');

    const deleteRoomBedQuery = `DELETE FROM roomBed WHERE roomId = ?`;
    await pool.query(deleteRoomBedQuery, [roomId]);

    const deleteRoomBathroomQuery = `DELETE FROM roomBathroom WHERE roomId = ?`;
    await pool.query(deleteRoomBathroomQuery, [roomId]);

    const deleteRoomPicturesQuery = `DELETE FROM roomsPictures WHERE roomId = ?`;
    await pool.query(deleteRoomPicturesQuery, [roomId]);

    const deleteRoomQuery = `DELETE FROM rooms WHERE roomId = ?`;
    await pool.query(deleteRoomQuery, [roomId]);

    await pool.query('COMMIT');

    return 'Room deleted successfully'
  } catch (error) {
    await pool.query('ROLLBACK');
    throw new Error('Error deleting room:', error);
  }
};


export default {
  getAllRooms,
  getSingleRoomById,
  createRoom,
  editRoom,
  deleteRoom,
};
