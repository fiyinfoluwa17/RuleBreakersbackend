## Node Blog API Documentation

### Step 1: Clone the Repository

1. Clone the GitHub repository to your local machine using Git:

   ```bash
   git clone https://github.com/Blard-omu/Node-Blog-api.git
   ```

2. Navigate to the project folder:

   ```bash
   cd Node-Blog-api
   ```

3. Start the server:
   ```
   npm start
   ```

<!-- Alternatively -->

### Step 2: Project Initialization

1. Create a new Node.js project and initialize it with npm:

   ```bash
   npm init -y
   ```

2. Install required dependencies (express, mongoose, dotenv, cloudinary, multer, express-validator, etc):

   ```bash
   npm install express mongoose dotenv cloudinary multer express-validator
   ```

### Step 3: Folder Structure

Create a folder structure for your project:

```
Node-Blog-api/
  ├── controllers/
  │   ├── authController.js
  │   ├── userController.js
  │   ├── blogController.js
  ├── models/
  │   ├── User.js
  │   ├── Blog.js
  ├── services/
  │   ├── blogConfig.js
  ├── routes/
  │   ├── authRoutes.js
  │   ├── userRoutes.js
  │   ├── blogRoutes.js
  ├── uploads/    # Create this folder to temporarily store image uploads
  index.js
  .env
```

### Step 4: Create Express Server

In your `index.js` file, set up the Express server:

```javascript
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Define your routes (auth, users, blog) and import them
app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/blog", require("./routes/blogRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Step 5: Connect to Database

Define your database connection URL and environment variables in the `.env` file:

```
MONGODB_CONNECTION_URL=mongodb+srv://your-db-connection-url
CLOUD_NAME=your-cloudinary-cloud-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-api-secret
```

### Step 6: Define Schemas

#### User Schema (`User.js`)

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

// Define a method to check the user's password
userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
```

#### Blog Schema (`Blog.js`)

```javascript
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: { type: String }, // For storing Cloudinary image URLs
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

```


### Step 7: Implement Controllers

#### User Controller (`userController.js`)
```javascript
const User = require('../models/User');

// Implement user controller functions (e.g., user registration, login, profile)

// Example user registration controller
const registerUser = async (req, res) => {
  try {
    // Your registration logic here
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

module.exports = {
  registerUser,
  // Add other user controller functions here
};

```



#### Blog Controller (`blogController.js`)

```JavaScript
const { validationResult } = require('express-validator');
const cloudinary = require('../services/blogConfig');
const Blog = require('../models/Blog');
const User = require('../models/User');

// Create a new blog post with validation
const createBlog = [
  // Define validation rules using Express Validator
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('author').notEmpty().withMessage('Author is required'),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Your createBlog logic here (including image upload to Cloudinary)
    } catch (error) {
      res.status(500).json({ message: 'Failed to create a blog', error: error.message });
    }
  },
];

// Update a blog post with validation
const updateBlog = [
  param('_id').notEmpty().withMessage('Blog ID is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Your updateBlog logic here (including image update to Cloudinary)
    } catch (error) {
      res.status(500).json({ message: 'Failed to update blog', error: error.message });
    }
  },
];

module.exports = {
  createBlog,
  updateBlog,
  // Add other blog controller functions here
};

```


### Step 8: Handling Image Upload with Cloudinary and Multer

In your `blogController.js`, use the `cloudinary` and `multer` packages to handle image uploads when creating or updating a blog post. the complete code in the src folder.

### Step 9: Testing with Postman

Test your API endpoints using Postman or any API testing tool. Ensure that you can create, read, update, and delete blog posts, as well as manage user accounts.

### Step 10: Hosting on Render

To host your API on Render, create a new Render service, connect your project's GitHub repository, and set up your deployment configuration. Ensure that environment variables (e.g., Cloudinary credentials) are securely stored on Render.

By following these steps and using the provided code examples in my repo [https://github.com/Blard-omu/Node-Blog-api.git], you can effectively set up and deploy your Node.js blog API.

---

Feel free to customize the documentation further to include any specific setup or usage instructions for your project.

I am BLARD, a Fullstack Developer and coding instructor at <a href="https://www.techstudioacademy.com/">Techstudioacademy</a>
