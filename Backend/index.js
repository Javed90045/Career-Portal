import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js"
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
dotenv.config({});

const app = express();

app.get('/', (req, resp) =>{
    resp.status(200).json({
        message : "I am coming from backend",
        success: true
    })
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOption = {
    origin:'http//localhost:5173',
    credentials: true
}

app.use(cors(corsOption));

//--------------------API's ------------------------
app.use("/api/v1/user",userRoute);


// Making server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
