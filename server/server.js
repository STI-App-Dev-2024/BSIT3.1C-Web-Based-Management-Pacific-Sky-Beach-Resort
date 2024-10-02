import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'
import { errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import usersRoutes from './routes/users/usersRoutes.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.json());
app.use(express.urlencoded({ limit: '100mb', extended: true, parameterLimit: 50000 }));
app.use(errorHandler);

app.get(`/`, (req, res) => {
  res.send(`Server is running on Port ${PORT}...`);
});

// routes
app.use('/users', usersRoutes)

const startServer = async () => {
  try {
    app.listen(PORT, console.log(`API is running in ${process.env.NODE_ENV} mode on port ${PORT}`.bold.blue));
    connectDB()
  } catch (error) {
    console.log(error);
  }
};

// Invoke to start the application
startServer()