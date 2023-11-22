import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config(); // Load environment variables

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

// Your protected route that requires token verification
router.get('/protected', verifyToken, (req, res) => {
  // You can use req.user to access the user information
  res.json({ message: 'Access granted', user: req.user });
});

export default router;
