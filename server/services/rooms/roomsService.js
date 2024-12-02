import conn from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";
import undefinedValidator from '../../utils/undefinedValidator.js'
import _ from "lodash";

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

    // Extract amenities from the room data
    const amenities = {
      hasWifi: !!room[0].hasWifi,
      hasKitchen: !!room[0].hasKitchen,
      hasTV: !!room[0].hasTV,
      hasShower: !!room[0].hasShower,
      hasAircon: !!room[0].hasAircon,
      hasGrill: !!room[0].hasGrill,
      hasRefrigerator: !!room[0].hasRefrigerator,
      hasHeater: !!room[0].hasHeater,
    };

    return {
      ...room[0],
      bedDetails,
      bathroomDetails,
      pictures: pictures.map(picture => picture.picture),
      amenities,
    };
  } catch (error) {
    throw new Error(error.message);
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
      description,
      hasWifi = false,
      hasKitchen = false,
      hasTV = false,
      hasShower = false,
      hasAircon = false,
      hasGrill = false,
      hasRefrigerator = false,
      hasHeater = false,
    } = req.body || {};

    const parsedBedDetails = JSON.parse(bedDetails);

    const roomId = uuidv4();
    const pictures = req.files?.pictures ? req.files.pictures.map(file => file.path) : [];
    const thumbnail = req.files?.thumbnail ? req.files.thumbnail[0].path : null;

    const roomQuery = `
      INSERT INTO rooms(
        roomId, userId, roomName, capacity, description, roomType, price, thumbnail, isOccupied,
        hasWifi, hasKitchen, hasTV, hasShower, hasAircon, hasGrill, hasRefrigerator, hasHeater
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      hasWifi,
      hasKitchen,
      hasTV,
      hasShower,
      hasAircon,
      hasGrill,
      hasRefrigerator,
      hasHeater,
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
      capacity,
      roomType,
      price,
      bedDetails,
      description,
      hasWifi,
      hasKitchen,
      hasTV,
      hasShower,
      hasAircon,
      hasGrill,
      hasRefrigerator,
      hasHeater,
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
        thumbnail = ?, 
        hasWifi = ?, 
        hasKitchen = ?, 
        hasTV = ?, 
        hasShower = ?, 
        hasAircon = ?, 
        hasGrill = ?, 
        hasRefrigerator = ?, 
        hasHeater = ?
      WHERE roomId = ?
    `;

    room.roomName = undefinedValidator(room.roomName, roomName);
    room.capacity = undefinedValidator(room.capacity, capacity);
    room.description = undefinedValidator(room.description, description);
    room.roomType = undefinedValidator(room.roomType, roomType);
    room.price = undefinedValidator(room.price, price);

    const amenities = {
      hasWifi: undefinedValidator(room.hasWifi, hasWifi),
      hasKitchen: undefinedValidator(room.hasKitchen, hasKitchen),
      hasTV: undefinedValidator(room.hasTV, hasTV),
      hasShower: undefinedValidator(room.hasShower, hasShower),
      hasAircon: undefinedValidator(room.hasAircon, hasAircon),
      hasGrill: undefinedValidator(room.hasGrill, hasGrill),
      hasRefrigerator: undefinedValidator(room.hasRefrigerator, hasRefrigerator),
      hasHeater: undefinedValidator(room.hasHeater, hasHeater),
    };

    let __thumbnail = req.files?.thumbnail ? thumbnail : room.thumbnail;

    await pool.query(roomQuery, [
      room.roomName,
      room.capacity,
      room.description,
      room.roomType,
      room.price,
      __thumbnail,
      amenities.hasWifi,
      amenities.hasKitchen,
      amenities.hasTV,
      amenities.hasShower,
      amenities.hasAircon,
      amenities.hasGrill,
      amenities.hasRefrigerator,
      amenities.hasHeater,
      room.roomId,
    ]);


    const transformedBedDetails = JSON.parse(bedDetails).map((item) => {
      return {
        bedType: item.bedType,
        bedCount: item.bedCount
      };
    });

    console.log(JSON.parse(bedDetails));
    console.log(transformedBedDetails);
    console.log(_.isEqual(transformedBedDetails, room.bedDetails))

    if (pictures.length > 0) {
      const existingPicturesQuery = `
        SELECT picture FROM roomsPictures WHERE roomId = ?
      `;
      const [existingPictures] = await pool.query(existingPicturesQuery, [roomId]);
      const existingPicturePaths = existingPictures.map((pic) => pic.picture);

      const picturesToRemove = existingPicturePaths.filter((pic) => !pictures.includes(pic));

      const newPictures = pictures.filter((pic) => !existingPicturePaths.includes(pic));

      if (picturesToRemove.length > 0) {
        const removePicturesQuery = `
          DELETE FROM roomsPictures WHERE roomId = ? AND picture = ?
        `;
        for (const picture of picturesToRemove) {
          await pool.query(removePicturesQuery, [roomId, picture]);
        }
      }

      if (newPictures.length > 0) {
        const roomPicturesQuery = `
          INSERT INTO roomsPictures(roomId, picture) VALUES (?, ?)
        `;
        for (const picture of newPictures) {
          await pool.query(roomPicturesQuery, [roomId, picture]);
        }
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

const archiveRoom = async (roomId) => {
  try {
    await pool.query('START TRANSACTION');
    const room = await getSingleRoomById(roomId);

    const roomValues = [
      room.roomId,
      room.userId,
      room.roomName,
      room.capacity,
      room.roomType,
      room.price,
      room.thumbnail,
      room.isOccupied,
      room.description,
      room.hasWifi,
      room.hasKitchen,
      room.hasTV,
      room.hasShower,
      room.hasAircon,
      room.hasGrill,
      room.hasRefrigerator,
      room.hasHeater,
    ];

    const archiveRoomQuery = `
    INSERT INTO roomsArchive(
        roomId, userId, roomName, capacity, roomType, price, thumbnail, isOccupied, description,
        hasWifi, hasKitchen, hasTV, hasShower, hasAircon, hasGrill, hasRefrigerator, hasHeater
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(archiveRoomQuery, roomValues);

    const bedQuery = `
      SELECT * FROM roombed WHERE roomId = ?
    `;

    const [bedDetails] = await pool.query(bedQuery, [roomId]);

    const archiveBedQuery = `
      INSERT INTO roomBedArchive(roomId, bedType, count) VALUES (?, ?, ?)
    `;

    for (const bed of bedDetails) {
      const { roomId, bedType, count } = bed;
      await pool.query(archiveBedQuery, [roomId, bedType, count]);
    }

    const bathroomQuery = `
    SELECT * FROM roomBathroom WHERE roomId = ?
  `;

    const [bathroomDetails] = await pool.query(bathroomQuery, [roomId]);

    const archiveBathroomQuery = `
      INSERT INTO roomBathroomArchive(roomId, bathRoomType, count) VALUES (?, ?, ?)
    `;

    for (const bathroom of bathroomDetails) {
      const { roomId, bathRoomType, count } = bathroom;
      await pool.query(archiveBathroomQuery, [roomId, bathRoomType, count]);
    }

    const picturesQuery = `
      SELECT picture FROM roomsPictures WHERE roomId = ?
    `;

    const [pictures] = await pool.query(picturesQuery, [roomId]);

    const archivePicturesQuery = `
      INSERT INTO roomsPicturesArchive(roomId, picture) VALUES (?, ?)
    `;

    for (const picture of pictures) {
      await pool.query(archivePicturesQuery, [roomId, picture.picture]);
    }

    await deleteRoom(roomId);

    await pool.query('COMMIT');

    return 'Room archived successfully';

  } catch (error) {
    await pool.query('ROLLBACK');
    throw new Error(error.message);
  }
}

export default {
  getAllRooms,
  getSingleRoomById,
  createRoom,
  editRoom,
  deleteRoom,
  archiveRoom,
};
