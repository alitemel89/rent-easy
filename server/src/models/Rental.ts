import mongoose, { Document, Schema } from 'mongoose';

export interface RentalDocument extends Document {
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  userRef: Schema.Types.ObjectId; // Add userRef field for user reference
  // Add more fields as needed
}

const rentalSchema = new Schema<RentalDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  location: { type: String, required: true },
  userRef: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Refers to the 'User' model (adjust this if needed)
    required: true,
  },
  // Define additional fields here
});

export const RentalModel = mongoose.model<RentalDocument>('Rental', rentalSchema);
