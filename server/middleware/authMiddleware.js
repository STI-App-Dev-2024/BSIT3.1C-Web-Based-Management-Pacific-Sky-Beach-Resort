import conn from "../config/db.js";
import jwt from 'jsonwebtoken';

const checkIfEmailAddressExist = async (req, res, next) => {
  const { emailAddress } = req.body;
  const pool = await conn();

  try {
    const query = `SELECT emailAddress FROM users WHERE emailAddress = ?`;
    const [result] = await pool.query(query, [emailAddress]);

    if (result.length > 0) {
      return res.status(409).send('Email already exists.');
    }

    next();
  } catch (error) {
    throw new Error(error);
  }
};

const protect = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ message: 'Invalid or expired token.' });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).send('You must be logged in.');
  }
};

const adminAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }

      if (user.position !== 'POSITIONS_MASTER_ADMIN') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Authorization token missing.' });
  }
};

const humanResourceAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }

      if (user.position !== 'POSITIONS_HUMAN_RESOURCE') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Authorization token missing.' });
  }
};

const authToManageUsers = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing.' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

    if (user.position !== 'POSITIONS_MASTER_ADMIN' && user.position !== 'POSITIONS_HUMAN_RESOURCE') {
      return res.status(403).json({ message: `Access denied. Admins & HR only`, });
    }

    req.user = user;
    next();
  });
};


const authToManageRoomsAndActivities = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }

      if (user.position !== 'POSITIONS_MASTER_ADMIN' && user.position !== 'POSITIONS_STAFF') {
        return res.status(403).json({ message: 'Access denied. Master Admin and Staff only.' });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Authorization token missing.' });
  }
};

export {
  checkIfEmailAddressExist,
  protect,
  adminAuth,
  humanResourceAuth,
  authToManageUsers,
  authToManageRoomsAndActivities
}
