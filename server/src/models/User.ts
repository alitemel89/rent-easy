import mongoose, { Document, Model } from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add other fields as needed
});

// Define the user document interface
export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  // Add other fields as needed
}

// Define the user model
export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);
