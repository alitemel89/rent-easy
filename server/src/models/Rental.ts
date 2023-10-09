// src/models/Rental.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface RentalDocument extends Document {
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  // Add more fields as needed
}

const rentalSchema = new Schema<RentalDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  location: { type: String, required: true },
  // Define additional fields here
});

export const RentalModel = mongoose.model<RentalDocument>('Rental', rentalSchema);
