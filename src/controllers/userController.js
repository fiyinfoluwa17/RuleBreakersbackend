import User from "../models/User.js";
import bcrypt from "bcrypt"


// Function to get all the users in db
const getAllUsers = async (req, res) => {
  try{
    // fetch users from db
    const users = await User.find();

    // send response
    res.json(users);

  }catch(err){
    res.status(500).json({message: 'failed to fetch users', error: err});
  }
};


// Controller to get a specific user by ID
const getOneUser = async (req, res) => {
  try{
    // destructure id from req.params
    const { _id } = req.params;

    // use Mongoose to find the user by ID
    const user = await User.findById(_id);

    // if user is not found
    if(!user){
      return res.status(404).json({message: 'user not found'})
    }

    // if user is found
    res.json(user);

  }catch(err){
    res.status(500).json({message: 'Failed to retrieve user', error: err.message});
  }
};


const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { username, password } = req.body;
    const user = await User.findById(_id);

    const updateUserData = {
      username: username || user.username,
    };

    // Check if a new password is provided in the request.
    if (password) {
      // Hash the new password before updating.
      const hashedPassword = await bcrypt.hash(password, 10);
      updateUserData.password = hashedPassword;
    } else {
      // If no new password is provided, retain the existing hashed password.
      updateUserData.password = user.password;
    }
    

    const updatedUser = await User.findByIdAndUpdate(_id, updateUserData, { new: true });

    // if user is not found
    if (!updatedUser || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // send response
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try{
    const { _id } = req.params;
    const deleteUser = await User.findByIdAndDelete(_id)

    res.json({message: 'User deleted successfully'})

  }catch(err){
    res.status(500).json({ message: 'Failed to delete user', error: err.message});
  }
};



export { getAllUsers, getOneUser, updateUser, deleteUser};
