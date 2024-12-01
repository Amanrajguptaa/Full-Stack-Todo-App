import mongoose from 'mongoose';
import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from "cloudinary"
import jwt from "jsonwebtoken"


const registerUser = async(req,res)=>{
    try {
        const{name,password,email}= req.body;
        const imageFile= req.file;

        if(!email || !password || !name){
            return res.status(400).json({message:"Please fill in all fields"});
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already in use"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url;

        const newUser =new userModel({
            name,
            email,
            password:hashedPassword,
            image:imageUrl? imageUrl:null
        });

        const savedUser = await newUser.save();
        res.status(201).json({message:"User created successfully",savedUser});

    } catch (error) {
        return res.status(500).json({ message: "User Creation Failed", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields" });
      }
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
      );
  
      res.status(200).json({ success: true, token });
    } catch (error) {
      return res.status(500).json({ message: "User Login Failed", error: error.message });
    }
};

const updateUser = async (req, res) => {
  try {
      const { id } = req.user; 
      const { name, email, password } = req.body;

      const currentUser = await userModel.findById(id);
      if (!currentUser) {
          return res.status(404).json({ message: "User not found" });
      }

      let imageUrl = currentUser.image; 
      const imageFile = req.file;
      if (imageFile) {
          const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
          imageUrl = imageUpload.secure_url; 
      }

      let hashedPassword = currentUser.password; 
      if (password) {
        const salt = bcrypt.genSalt(10);
          hashedPassword = await bcrypt.hash(password, salt);
      }

      const updatedUser = await userModel.findByIdAndUpdate(
          id,
          {
              name: name || currentUser.name, 
              email: email || currentUser.email,
              password: hashedPassword,
              image: imageUrl 
          },
          { new: true } 
      );

      res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
      res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};



export {registerUser,loginUser,updateUser}