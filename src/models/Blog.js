// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    state: {type: String, enum: ["draft", "published"], default: "draft"},
    author: {type: String},
    imageUrl: {type: String}
},
{timestamps: true})

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;