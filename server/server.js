import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";

import usersRoutes from "./routes/users/usersRoutes.js";
import roomsRoutes from "./routes/rooms/roomsRoutes.js";
import appointmentsRoutes from "./routes/appointments/appointmentsRoutes.js";
import pressReleaseRoutes from "./routes/press-release/pressReleaseRoutes.js";
import contactsRoutes from './routes/contacts/contactsRoutes.js'

import tables from "./tables/tables.js";
import conn from "./config/db.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }));

// Routes
app.use(`/api/${process.env.API_VERSION}/users`, usersRoutes);
app.use(`/api/${process.env.API_VERSION}/rooms`, roomsRoutes);
app.use(`/api/${process.env.API_VERSION}/appointments`, appointmentsRoutes);
app.use(`/api/${process.env.API_VERSION}/press-release`, pressReleaseRoutes);
app.use(`/api/${process.env.API_VERSION}/contacts`, contactsRoutes);

app.get(`/`, (req, res) => {
  res.send(`Server is running on Port ${PORT}...`);
});

// Custom error handler - must be last middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`API is running in ${process.env.NODE_ENV} mode on port ${PORT}`.bold.blue);
      connectDB(); // Connect to the database after the server starts
    });
  } catch (error) {
    console.log(error);
  }
};

const createTables = async () => {
  try {
    const pool = await conn();
    await tables(pool);
  } catch (error) {
    console.error('Error setting up tables:', error);
  }
};

// Invoke to start the application
startServer();
createTables();
