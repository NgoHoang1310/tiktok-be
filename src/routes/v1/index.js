import express from 'express';
import { authRoutes } from './authRoutes.js';
import { videoRoutes } from './videoRoutes';
import { userRoutes } from './userRoutes.js';
import { commentRoutes } from './commentRoutes.js';
import { reactionRoutes } from './reactionRoutes.js';
import { hashtagRoutes } from './hashtagRoutes.js';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/videos', videoRoutes);
router.use('/comments', commentRoutes);
router.use('/reactions', reactionRoutes);
router.use('/hashtags', hashtagRoutes);

export const APIs_V1 = router;
