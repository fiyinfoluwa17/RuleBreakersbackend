import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

console.log(process.env.CLOUD_NAME);
console.log(process.env.API_KEY);
console.log(process.env.API_SECRET);


export { cloudinary }; 
