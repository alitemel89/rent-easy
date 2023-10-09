// server/src/seed.ts
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { RentalModel } from './models/Rental'; // Adjust the path as needed

const mongoUri = process.env.MONGO_URI!;

if (!mongoUri) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1);
}

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);

    // Sample rental data
    const rentalsData = [
      {
        title: 'Cozy Apartment',
        description: 'A cozy apartment in the city center.',
        price: 1000,
        bedrooms: 2,
        bathrooms: 1,
        location: 'Downtown',
      },
      {
        title: 'Spacious House',
        description: 'A spacious house with a large backyard.',
        price: 2000,
        bedrooms: 3,
        bathrooms: 2,
        location: 'Suburb',
      },
      // Add more rental data as needed
    ];

    // Create instances of RentalModel and save them to the database
    const rentals = await RentalModel.create(rentalsData);

    console.log('Sample data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.disconnect();
  }
}

// Call the seeding function
seedData();
