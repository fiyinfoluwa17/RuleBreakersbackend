import User from '../models/User.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const register = async (req, res) => {
  try{
    // define the body fields
    const { username, email, password } = req.body;

    // validations for all fields
    if(!username.trim()){
      return res.json({ error: "username must not be empty!"})
    }
    if(!email){
      return res.json({ error: "Email must not be empty!"})
    }
    if(!password || password.length < 6){
      return res.json({ error: "password must be at least 6 characters long!"})
    }

    // check if user is already exist
    const userExist = await User.findOne({ email });

    if(userExist){
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Register a new user
    const user = new User({username, email, password: hashedPassword});

    // Save the user in db
    await user.save();

    // remove pasword from res body
    user.password = undefined;

    // create token for new user
    const secret =  process.env.JWT_SECRET
    const token = jwt.sign({userId: user._id}, secret, {expiresIn: "7d"})
    console.log("JWT_SECRET: ", secret);
  
    // send a notification
    res.status(201).json({message: 'User registered successfully', user, token});

  }catch(err){
    res.status(500).json({error: "User registration failed", message: err});
  }
};


// login
const login = async (req, res) => {
  try{
    // destructure the required fields
    const { email, password } = req.body;

    // validations for all fields
    if(!email){
      return res.json({ error: "Email must not be empty!"})
    }
    if(!password || password.length < 6){
      return res.json({ error: "password must be at least 6 characters long!"})
    }

    // check if user is already exist
    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({ error: 'User not found!' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // compare password
    const validPassword = await user.comparePassword(password)

    if(!validPassword){
      return res.status(401).json({error: 'Invalid password!'});
    }

    // create token for new user
    const secret =  process.env.JWT_SECRET
    const token = jwt.sign({userId: user._id}, secret, {expiresIn: "7d"})
    console.log("JWT_SECRET: ", secret);
  
    // send a notification
    res.status(200).json({message: 'User logged in successfully',
    user: {
      _id: user._id,
      username: user.username, // Include username here
      // Include other user information if needed
    },
    token,});

  }catch(err){
    res.status(500).json({message: "Login failed", error: err});
  }

}; 

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export { login, register, verifyToken} 

