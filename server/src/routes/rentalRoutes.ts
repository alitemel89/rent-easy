import express from 'express';
import { createRental, updateRental, deleteRental, getRentals } from '../controllers/rentalController';
import { authMiddleware } from '../middleware/authMiddleware'; // Import your authMiddleware

const router = express.Router();

// Create a new rental listing
router.post('/create', authMiddleware, createRental); // Protect this route

// Update a rental listing by ID
router.put('/update/:id', authMiddleware, updateRental); // Protect this route

// Delete a rental listing by ID
router.delete('/delete/:id', authMiddleware, deleteRental); // Protect this route

// Get all rental listings (public route, no authentication required)
router.get('/all', getRentals);

export default router;
