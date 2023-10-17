// authController.js (or loginController.js)

import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/secrets'; // Import your JWT secret
import { Request, Response } from 'express';
import UserModel from '../models/User';

// Controller function for user login
export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Generate and return a JWT token upon successful login
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      } else if (token) {
        res.json({ token, user });
      }
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
