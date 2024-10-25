import { v4 as uuidv4 } from 'uuid';
import conn from "../../config/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const pool = await conn()

const getAllUsers = async () => {
  const query = `
    SELECT *  FROM users
  `;

  const [rows] = await pool.query(query);
  return rows;
};

const authUser = async (email, password) => {
  const pool = await conn();

  const query = `
    SELECT * FROM users
    WHERE emailAddress = ?
  `;

  // Get user by email
  const [users] = await pool.query(query, [email]);
  const user = users[0];

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid || !user) {
    throw new Error('Invalid Credentials.');
  }

  const token = jwt.sign(
    {
      ...user
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { user, token };
};


const registerUser = async (payload) => {
  const {
    firstName,
    lastName,
    emailAddress,
    password,
    avatar,
    mobileNumber,
    position,
  } = payload || {};

  const userId = uuidv4();

  const hashedPassword = await bcrypt.hash(password, 10);

  const userQuery = `
    INSERT INTO users (userId, firstName, lastName, emailAddress, password, avatar, mobileNumber, position) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  await pool.query(userQuery, [
    userId,
    firstName,
    lastName,
    emailAddress,
    hashedPassword,
    avatar,
    mobileNumber,
    position,
  ]);

  return `User registered successfully`;
};

const deleteUser = async (userID) => {
  const query = `DELETE FROM users WHERE userId = ?`;

  await pool.query(query, [userID]);
  return `User deleted`
}


export default {
  authUser,
  getAllUsers,
  registerUser,
  deleteUser
}