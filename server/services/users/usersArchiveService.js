import conn from "../../config/db.js";

const pool = await conn();

const getAllArchivedUsers = async () => {
  try {
    const usersQuery = `
  SELECT * FROM usersArchive
`;

    const [users] = await pool.query(usersQuery);

    return users;
  } catch (error) {
    throw new Error(error);
  }
}

const getSingleArchivedUserById = async (userId) => {
  try {
    const userQuery = `
      SELECT * FROM usersArchive
      WHERE userId = ?
    `;

    const [user] = await pool.query(userQuery, [userId]);

    if (!user.length) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error(error);
  }
}

const deleteArchivedUser = async (userId) => {
    try {
        const userQuery = `
        DELETE FROM usersArchive
        WHERE userId = ?
        `;
    
        await pool.query(userQuery, [userId]);
    
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error(error);
    }
}

const restoreArchivedUser = async (userId) => {
    try {
        const userQuery = `
        SELECT * FROM usersArchive
        WHERE userId = ?
        `;
    
        const [user] = await pool.query(userQuery, [userId]);
    
        if (!user.length) {
            throw new Error('User not found');
        }
    
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            avatar,
            position,
            mobileNumber,
            bio,
            createdAt,
            updatedAt
        } = user[0];
    
        const insertQuery = `
        INSERT INTO users
        (userId, firstName, lastName, emailAddress,password, avatar,position, mobileNumber, bio, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
        `;
    
        await pool.query(insertQuery, [userId, firstName, lastName, emailAddress,password, avatar,position, mobileNumber, bio, createdAt, updatedAt]);
    
        const deleteQuery = `
        DELETE FROM usersArchive
        WHERE userId = ?
        `;
    
        await pool.query(deleteQuery, [userId]);
    
        return { message: 'User restored successfully' };
    } catch (error) {
        throw new Error(error);
    }
}

export default {
    getAllArchivedUsers,
    getSingleArchivedUserById,
    deleteArchivedUser,
    restoreArchivedUser
}