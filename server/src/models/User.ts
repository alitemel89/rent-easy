import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
  avatar: string; // Add the avatar field
}

const userSchema = new Schema<UserDocument>({
  username: String,
  email: String,
  password: String,
  name: String,
  surname: String,
  phoneNumber: String,
  avatar: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  },
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
