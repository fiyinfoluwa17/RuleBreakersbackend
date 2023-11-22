// routes/blogRoutes.js
import express from 'express';
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogController.js';
import upload from '../services/multer.js'
import requireSignedIn from '../middlewares/auth.js';

const router = express.Router();

// Endpoint to create a new blog (create)
router.post('/create-blog', requireSignedIn,  upload.single('imageUrl'), createBlog);
// Endpoint to get all blogs (Read)
router.get('/blogs/all', getAllBlogs);

// Endpoint to get a specific blog by _id (Read)
router.get('/blog/:_id', getBlogById);

// Endpoint to update a blog (Update)
router.put('/blogger/:_id',  upload.single('imageUrl'), updateBlog);

// Endpoint to delete a blog (Delete)
router.delete('/blog/:_id', deleteBlog);

export default router;
