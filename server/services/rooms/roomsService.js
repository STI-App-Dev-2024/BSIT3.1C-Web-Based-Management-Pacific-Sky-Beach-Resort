import conn from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";

const pool = await conn();

const getAllRooms = async () => {
  try {
    const roomsQuery = `
  SELECT r.roomId, r.roomName, r.userId, r.capacity, r.price, r.thumbnail, r.isOccupied
  FROM rooms r
`;

    const [rooms] = await pool.query(roomsQuery);

    const bedQuery = `
  SELECT bedType, count FROM roomBed WHERE roomId = ?
`;

    const bathroomQuery = `
  SELECT bathRoomType, count FROM roomBathroom WHERE roomId = ?
`;

    const picturesQuery = `
  SELECT picture FROM roomsPictures WHERE roomId = ?
`;

    const __rooms = await Promise.all(rooms.map(async (room) => {
      const [bedDetails] = await pool.query(bedQuery, [room.roomId]);
      const [bathroomDetails] = await pool.query(bathroomQuery, [room.roomId]);
      const [pictures] = await pool.query(picturesQuery, [room.roomId]);

      return {
        ...room,
        bedDetails,
        bathroomDetails,
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
      SELECT roomId, roomName, userId, capacity, price, thumbnail, isOccupied
      FROM rooms
      WHERE roomId = ?
    `;

    const [room] = await pool.query(roomQuery, [roomId]);

    if (!room.length) {
      throw new Error('Room not found');
    }

    const bedQuery = `
      SELECT bedType, count FROM roomBed WHERE roomId = ?
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

const createRoom = async (payload) => {
  try {
    const {
      roomName,
      userId,
      capacity,
      price,
      thumbnail,
      bedDetails = [],
      bathroomDetails = [],
      pictures = [],
    } = payload || {};

    const roomId = uuidv4();

    const roomQuery = `
  INSERT INTO rooms(roomId, userId, roomName, capacity, price, thumbnail, isOccupied)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

    await pool.query(roomQuery, [
      roomId,
      userId,
      roomName,
      capacity,
      price,
      thumbnail,
      false,
    ]);

    const roomBedQuery = `INSERT INTO roomBed(roomId, bedType, count) VALUES (?, ?, ?)`;
    for (const bed of bedDetails) {
      const { bedType, bedCount } = bed;
      await pool.query(roomBedQuery, [roomId, bedType, bedCount]);
    }

    const roomBathroomQuery = `INSERT INTO roomBathroom(roomId, bathRoomType, count) VALUES (?, ?, ?)`;
    for (const bathroom of bathroomDetails) {
      const { bathRoomType, bathRoomCount } = bathroom;
      await pool.query(roomBathroomQuery, [roomId, bathRoomType, bathRoomCount]);
    }

    const roomPicturesQuery = `INSERT INTO roomsPictures(roomId, picture) VALUES (?, ?)`;
    for (const picture of pictures) {
      await pool.query(roomPicturesQuery, [roomId, picture]);
    }

    return { message: 'Room created successfully', roomId };
  } catch (error) {
    throw new Error(error)
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
  deleteRoom,
};
