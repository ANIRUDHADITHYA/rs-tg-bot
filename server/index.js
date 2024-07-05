import express from "express";
import connectDB from "./lib/db.js";
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserRouter } from "./routes/user.route.js";


dotenv.config()

const app = express()


app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "https://vocal-babka-debd9a.netlify.app"], credentials: true }));
app.use(cookieParser({ origin: ["http://localhost:3000", "https://vocal-babka-debd9a.netlify.app"], credentials: true }));
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api', UserRouter);

const getCurrentTimestamp = (req, res) => {
    const currentTimestamp = Date.now();
    res.status(200).json({ timestamp: currentTimestamp });
};

app.use('/api/getCurrentTimestamp', getCurrentTimestamp);

app.listen(4000, () => {
    console.log('Server is running on port 3000');
});
