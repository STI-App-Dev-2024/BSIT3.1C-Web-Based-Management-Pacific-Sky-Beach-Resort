import conn from "../../config/db.js";
import { v4 as uuidv4 } from 'uuid';

const pool = await conn()

const getAllUsers = async () => {
  const query = `
    SELECT 
      u.userId,
      u.firstName,
      u.lastName,
      u.emailAddress,
      u.avatar,
      u.mobileNumber,
      p.positionID,
      p.label,
      p.value
    FROM 
      users AS u
    LEFT JOIN 
      userpositions AS up ON u.userId = up.userId
    LEFT JOIN 
      positions AS p ON up.positionID = p.positionID
  `;

  const [rows] = await pool.query(query);
  return rows;
};

const registerUser = async (payload) => {
  const {
    firstName,
    lastName,
    emailAddress,
    password,
    avatar,
    mobileNumber,
    label,
    value
  } = payload || {};

  const userId = uuidv4();
  const positionId = uuidv4();

  const userQuery = `
    INSERT INTO users (userId, firstName, lastName, emailAddress, password, avatar, mobileNumber) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  await pool.query(userQuery, [userId, firstName, lastName, emailAddress, password, avatar, mobileNumber]);

  const positionQuery = `
    INSERT INTO positions (positionID, label, value) 
    VALUES (?, ?, ?)
  `;
  await pool.query(positionQuery, [positionId, label, value]);

  const userPositionQuery = `
    INSERT INTO userPositions (userId, positionID) 
    VALUES (?, ?)
  `;
  await pool.query(userPositionQuery, [userId, positionId]);

  return `User registered successfully`;
};


const deleteUser = async(userID) =>{
  const query = `DELETE FROM users WHERE userId = ?`;

  await pool.query(query, [userID]);
  return `User deleted`
  }


export default {
  getAllUsers,
  registerUser,
  deleteUser
}