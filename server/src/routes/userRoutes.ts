import express from 'express';
import { createUserProfile, getUserProfile } from '../controllers/userController';

const router = express.Router();

router.get('/:id', getUserProfile);

// Create user profile by ID
router.post('/:id', createUserProfile);


export default router;