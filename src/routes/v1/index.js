import express from 'express';
import { authRoutes } from './authRoutes.js';
import { videoRoutes } from './videoRoutes';
import { userRoutes } from './userRoutes.js';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/videos', videoRoutes);

export const APIs_V1 = router;
