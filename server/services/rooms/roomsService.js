import conn from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";

const pool = await conn();

const getAllRooms = async () => {
  const query = `SELECT * FROM rooms`;

  const [rows] = await pool.query(query);
  return rows;
};

const createRoom = async (payload) => {
  const {
    roomName,
    bedType,
    bedQuantity,
    bathroomCount,
    capacity,
    rate,
    thumbnail,
    status,
  } = payload || {};

  const roomID = uuidv4();

  const roomQuery = `
  INSERT INTO rooms(roomID,roomName, bedType, bedQuantity,bathroomCount,capacity,rate,thumbnail,status)
  VALUES (?,?,?,?,?,?,?,?,?)`;

  await pool.query(roomQuery, [
    roomID,
    roomName,
    bedType,
    bedQuantity,
    bathroomCount,
    capacity,
    rate,
    thumbnail,
    status,
  ]);

  return `Room created successfully`;
};

const deleteRoom = async(roomID) =>{
  const query = `DELETE FROM rooms WHERE roomID = ?`;

  await pool.query(query, [roomID]);
  return `Room deleted`
}

export default {
  getAllRooms,
  createRoom,
  deleteRoom,
};