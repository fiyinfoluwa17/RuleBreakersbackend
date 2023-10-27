import express from 'express';
import { getAllUsers, getOneUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();



router.get('/users', getAllUsers);
router.get('/users/:_id', getOneUser);
router.put('/users/:_id', updateUser);
router.delete('/users/:_id', deleteUser); 

export default router;
