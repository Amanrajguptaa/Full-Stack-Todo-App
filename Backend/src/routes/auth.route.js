import express from "express"
import {registerUser,loginUser, updateUser} from '../controllers/auth.controller.js'
import upload from "../middlewares/multer.js"
import authMiddleware from '../middlewares/auth.middleware.js'

const authRouter = express.Router();

authRouter.post('/register',upload.single('image'),registerUser)
authRouter.post('/login',loginUser)
authRouter.put('/update',authMiddleware,updateUser)

export default authRouter;