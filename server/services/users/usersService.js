import { v4 as uuidv4 } from 'uuid';
import conn from "../../config/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import undefinedValidator from '../../utils/undefinedValidator.js'
import { sendEmail } from '../../utils/sendNodeMail.js';
import { COMPANY_NAME } from '../../constants/constants.js';
import emailRegistrationNotification from '../../templates/emailRegistrationNotification.js';
import { randomStringGenerator } from '../../utils/randomStringGenerator.js';

const pool = await conn()

const getAllUsers = async () => {
  const query = `
    SELECT *  FROM users
  `;

  const [rows] = await pool.query(query);
  return rows;
};

const getSingleUserById = async (userId) => {
  const query = `
SELECT * FROM users WHERE userId = ?
`
  const [user] = await pool.query(query, [userId])

  if (user.length === 0) {
    throw new Error('No user found!.')
  }

  return user[0]
}

const authUser = async (email, password) => {
  const pool = await conn();

  const query = `
    SELECT * FROM users
    WHERE emailAddress = ?
  `;

  const [users] = await pool.query(query, [email]);
  const user = users[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid Credentials.');
  }

  const token = jwt.sign(
    {
      ...user
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { user, token };
};


const registerUser = async (req) => {
  const {
    firstName,
    lastName,
    emailAddress,
    mobileNumber,
    position,
  } = req.body || {};

  const userId = uuidv4();
  const password = randomStringGenerator()

  const hashedPassword = await bcrypt.hash(password, 10);

  const avatar = req.files && req.files['avatar'] ? req.files['avatar'][0].path : null;

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


  const subject = `Welcome to ${COMPANY_NAME} ${firstName} ${lastName}`
  const content = emailRegistrationNotification({
    firstName,
    lastName,
    emailAddress,
    password
  })

  await sendEmail(emailAddress, subject, content)

  return `User registered successfully`;
};

const updateUser = async (req) => {
  const { params, body } = req;
  const user = await getSingleUserById(params.userId);

  const {
    firstName,
    lastName,
    emailAddress,
    mobileNumber,
    bio
  } = body || {};

  let avatar;
  if (req.files && req.files.avatar && req.files.avatar.length > 0) {
    avatar = req.files.avatar[0].path;
  } else {
    avatar = user.avatar;
  }

  user.firstName = undefinedValidator(user.firstName, firstName);
  user.lastName = undefinedValidator(user.lastName, lastName);
  user.emailAddress = undefinedValidator(user.emailAddress, emailAddress);
  user.mobileNumber = undefinedValidator(user.mobileNumber, mobileNumber);
  user.avatar = undefinedValidator(user.avatar, avatar);
  user.bio = undefinedValidator(user.bio, bio);

  const query = `
    UPDATE users
    SET 
      firstName = ?,
      lastName = ?,
      emailAddress = ?,
      avatar = ?,
      mobileNumber = ?,
      bio = ?,
      updatedAt = CURRENT_TIMESTAMP
    WHERE userId = ?
  `;

  const values = [user.firstName, user.lastName, user.emailAddress, user.avatar, user.mobileNumber, user.bio, params.userId];

  const [result] = await pool.query(query, values);

  if (result.affectedRows === 0) {
    throw new Error('User update failed, no rows affected.');
  }

  return `${user.userId} has been updated successfully.`;
};


const deleteUser = async (userId) => {
  const query = `DELETE FROM users WHERE userId = ?`;

  await pool.query(query, [userId]);
  return `User deleted`
}

const changePassword = async (body) => {
  const { userId, oldPassword, newPassword, confirmPassword } = body || {};

  if (newPassword !== confirmPassword) {
    throw new Error('New password and confirm password do not match');
  }

  const userQuery = `SELECT * FROM users WHERE userId = ?`;
  const [user] = await pool.query(userQuery, [userId]);

  if (!user) {
    throw new Error('User not found');
  }

  const isOldPasswordValid = await bcrypt.compare(oldPassword, user[0]?.password);
  if (!isOldPasswordValid) {
    throw new Error('Old password is incorrect');
  }

  if (!newPassword) {
    throw new Error('New password is required');
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const updateQuery = `UPDATE users SET password = ?, updatedAt = CURRENT_TIMESTAMP WHERE userId = ?`;
  const result = await pool.query(updateQuery, [hashedNewPassword, userId]);

  if (result.affectedRows === 0) {
    throw new Error('Password update failed');
  }

  return 'Password updated successfully';
};

const archiveUser = async (userId) => {
  const user = await getSingleUserById(userId);

  const archiveQuery = `
    INSERT INTO usersArchive (userId, firstName, lastName, emailAddress, password, avatar, mobileNumber, position, bio, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user.userId,
    user.firstName,
    user.lastName,
    user.emailAddress,
    user.password,
    user.avatar,
    user.mobileNumber,
    user.position,
    user.bio,
    user.createdAt,
    user.updatedAt
  ];

  await pool.query(archiveQuery, values);
  await deleteUser(userId);

  return `User has been archived successfully.`;
};

export default {
  authUser,
  getAllUsers,
  getSingleUserById,
  registerUser,
  updateUser,
  deleteUser,
  changePassword,
  archiveUser
}