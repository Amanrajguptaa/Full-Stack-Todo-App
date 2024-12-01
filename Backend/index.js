import express from "express"
import connectDB from "./src/db/index.js";
import dotenv from 'dotenv/config'
import todoRouter from "./src/routes/todo.route.js";
import authRouter from "./src/routes/auth.route.js";
import connectCloudinary from "./src/utils/cloudinary.js"
import cors from 'cors';
import cookieParser from "cookie-parser";

const app= express();

const port = process.env.PORT || 4000;

connectCloudinary();

app.use(cors({
  origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    })
})
.catch((err)=>{
    console.log(err);
})

app.use('/api/user',authRouter)
app.use('/api/todo',todoRouter)


