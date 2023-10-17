import { Request, Response } from "express";
import UserModel from "../models/User";

// Get user profile by ID
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Return user profile information
    res.json({
      email: user.email,
      avatar: user.avatar,
      username: user.username,
      name: user.name,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { name, surname, phoneNumber } = req.body;

    // Find the user by their ID (assuming you have a user ID available)
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user profile information
    user.name = name;
    user.surname = surname;
    user.phoneNumber = phoneNumber;

    // Save the updated user profile
    await user.save();

    res.json(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
