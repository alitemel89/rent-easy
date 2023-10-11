import express from 'express';
import { createRental, updateRental, deleteRental, getRentals } from '../controllers/rentalController'; // Import the rental controller functions

const router = express.Router();

// Create a new rental listing
router.post('/create', createRental);

// Update a rental listing by ID
router.put('/update/:id', updateRental);

// Delete a rental listing by ID
router.delete('/delete/:id', deleteRental);

// Get all rental listings
router.get('/all', getRentals);

export default router;
