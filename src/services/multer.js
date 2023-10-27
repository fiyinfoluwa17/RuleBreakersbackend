// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); 
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
//   },
// });

// const upload = multer({ storage: storage });

// export default upload


import multer from 'multer';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config()

// Initialize Cloudinary with your Cloudinary configuration
cloudinaryV2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    allowedFormats: ['jpg', 'png', 'jpeg'],
  },
});

// Create multer instance with Cloudinary storage
const upload = multer({ storage: storage });

export default upload;
