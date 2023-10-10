import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}));

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connect database");
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })

}).catch((err) => {
    console.log({ err });
    process.exit(1);
});

