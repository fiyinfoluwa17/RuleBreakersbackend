import express  from "express";
import { login, register, verifyToken } from "../controllers/authController.js"

const router = express.Router();

router.post('/login', login)
router.post('/register', register)
router.get('/protected', verifyToken,  (req, res) => {
    // You can use req.user to access the user information
    res.json({ message: 'Access granted', user: req.user });
  });

export default router;

 


