import conn from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";

const pool = await conn();

const getAllRooms = async () => {
  const query = `SELECT 
    r.*,
    (SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'bedId', rb.bedTypeId,
        'count', rb.count
      )
    ) 
    FROM roomBed rb 
    WHERE rb.roomId = r.roomId) AS bedDetails,
    (SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'bathroomId', rbth.bathroomTypeId,
        'count', rbth.count
      )
    ) 
    FROM roomBathroom rbth 
    WHERE rbth.roomId = r.roomId) AS bathroomDetails
  FROM 
    rooms r
  GROUP BY r.roomId; `;

  const [rows] = await pool.query(query);
  return rows;
};

const getSingleRoomById = async (roomId) => {
  const query =`SELECT 
    r.*,
    (SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'bedId', rb.bedTypeId,
        'count', rb.count
      )
    ) 
    FROM roomBed rb 
    WHERE rb.roomId = r.roomId) AS bedDetails,
    (SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'bathroomId', rbth.bathroomTypeId,
        'count', rbth.count
      )
    ) 
    FROM roomBathroom rbth 
    WHERE rbth.roomId = r.roomId) AS bathroomDetails,
    (SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'picture', rp.picture
      )
    ) 
    FROM roomsPictures rp 
    WHERE rp.roomId = r.roomId) AS roomPictures
  FROM 
    rooms r
  WHERE roomId = ?
  GROUP BY r.roomId; `;

  const [rows] = await pool.query(query, [roomId]);
  return rows;
};

const createRoom = async (payload) => {
  const {
    roomName,
    capacity,
    rate,
    thumbnail,
    status,
    bedDetails=[],
    bathroomDetails=[],
    pictures=[],
  } = payload || {};

  const roomId = uuidv4();

  const roomQuery = `
  INSERT INTO rooms(roomId,roomName,capacity,rate,thumbnail,status)
  VALUES (?,?,?,?,?,?)
  `;

  const room = await pool.query(roomQuery, [
    roomId,
    roomName,
    capacity,
    rate,
    thumbnail,
    status,
  ]);

  const roomBedQuery = `INSERT INTO roomBed(roomId,bedTypeId,count) VALUES (?, ?, ?)`;

  for (const bed of bedDetails) {
    const { bedTypeId, bedCount } = bed;
    await pool.query(roomBedQuery, [roomId, bedTypeId, bedCount]);
  }
  
  const roomBathroomQuery = `INSERT INTO roomBathroom(roomId,bathroomTypeId,count) VALUES (?, ?, ?)`;

  for (const bathroom of bathroomDetails) {
    const { bathroomTypeId, bathroomCount } = bathroom;
    await pool.query(roomBathroomQuery, [roomId, bathroomTypeId, bathroomCount]);
  }

  const roomPicturesQuery = `INSERT INTO roomsPictures(roomId,picture) VALUES (?, ?)`;

  for (const picture of pictures) {
    await pool.query(roomPicturesQuery, [roomId, picture]);
  }

  return `Room created successfully`;
};

const deleteRoom = async (roomId) => {
  const query = `DELETE FROM rooms WHERE roomId = ?`;

  await pool.query(query, [roomId]);

  const roomBedQuery = `DELETE FROM roomBed WHERE roomId = ?`;
  await pool.query(roomBedQuery, [roomId]);

  const roomBathroomQuery = `DELETE FROM roomBathroom WHERE roomId = ?`;
  await pool.query(roomBathroomQuery, [roomId]);

  const roomPicturesQuery = `DELETE FROM roomsPictures WHERE roomId = ?`;
  await pool.query(roomPicturesQuery, [roomId]);
  return `Room deleted`;
};

export default {
  getAllRooms,
  getSingleRoomById,
  createRoom,
  deleteRoom,
};
