import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/secrets";
import UserModel from "../models/User";

export const register = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if the email is already registered
    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // Create a new user
    user = new UserModel({
      username,
      email,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Generate and return a JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (err: Error | null, token?: string) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
      }
      if (token) {
        return res.json({ token });
      }
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
