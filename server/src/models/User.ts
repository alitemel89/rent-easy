import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
}

const userSchema = new Schema<UserDocument>({
  username: String,
  email: String,
  password: String,
  name: String,
  surname: String,
  phoneNumber: String,
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
