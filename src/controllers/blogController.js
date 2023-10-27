import { cloudinary } from '../services/cloudinaryConfig.js';
import Blog from '../models/Blog.js';
import User from '../models/User.js';



// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const imageFile = req.file;

    // Find the user by their username
    const user = await User.findOne({ username: author });

    if (!user) {
      return res.status(400).json({ message: 'You must log in to create a blog' });
    }

    // Upload the image to Cloudinary
    const imageResult = await cloudinary.uploader.upload(imageFile.path);

    const blog = new Blog({
      title,
      content,
      author: user.username,
      imageUrl: imageResult.secure_url,
    });

    // Save the new blog to the database
    await blog.save();

    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create a blog', error: error.message });
  }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
  }
};

// Get a specific blog post by ID
const getBlogById = async (req, res) => {
  try {
    const { _id } = req.params;
    const blog = await Blog.findById(_id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch the blog', error: error.message });
  }
};

// Update a specific blog post, including optional image update
const updateBlog = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedBlogData = req.body;
    const imageFile = req.file;

    const existingBlog = await Blog.findById(_id);

    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (imageFile) {
      const imageResult = await cloudinary.uploader.upload(imageFile.path);
      existingBlog.imageUrl = imageResult.secure_url;
    }

    existingBlog.title = updatedBlogData.title || existingBlog.title;
    existingBlog.content = updatedBlogData.content || existingBlog.content;

    const updatedBlog = await existingBlog.save();

    res.json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog', error: error.message });
  }
};

// Delete a specific blog post
const deleteBlog = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(_id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog', error: error.message });
  }
};

export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
