


import express from 'express';
import mongoose from 'mongoose';
const dotenv = require("dotenv")
dotenv.config({path:"./config.env"})
// Replace 'my-mongodb-database' with your actual MongoDB database name
const DB_URLIS="mongodb+srv://soumya-9641:soumya@cluster0.y7qxfvq.mongodb.net/SearchImages?retryWrites=true&w=majority";

//const DB_URL="";
// Create a function to connect to MongoDB
export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_URLIS, {
      
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}