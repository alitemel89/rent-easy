// loginRoutes.js

import express from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/loginController';

const router = express.Router();

// Route for user login
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login // Use the login controller function
);

export default router; // Export the router
