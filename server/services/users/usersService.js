import conn from "../../config/db.js";

const pool = await conn()

const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM usersManagement');

  return rows;
}

const registerUser = async (payload) => {
  const {
    userId,
    firstName,
    lastName,
    emailAddress,
    password,
    thumbnail
  } = payload || {}

  const query = `
  INSERT INTO usersManagement (userId, firstName, lastName, emailAddress, password, thumbnail) 
  VALUES (?, ?, ?, ?, ?, ?)
`;

  await pool.query(query, [userId, firstName, lastName, emailAddress, password, thumbnail]);
  return `User registered successfully`
}

export default {
  getAllUsers,
  registerUser
}