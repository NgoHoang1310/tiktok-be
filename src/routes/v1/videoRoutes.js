import express from 'express';
import { videoControllers } from '../../controllers';
import * as jwt from '../../middlewares/authorizationJWTMiddleWare';

import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage(), limits: { fieldSize: 1 * 1024 * 1024 * 1024 } });

const router = express.Router();

router.route('/').get(videoControllers.getVideos);
router.route('/foryou').get(jwt.verifyAssessToken, videoControllers.getVideosForyou);
router.route('/discover').get(videoControllers.getDiscoverVideos);
router.route('/:id/profile').get(videoControllers.getVideosProfile);
router.route('/following/:userId').get(videoControllers.getFollowingVideos);
router.route('/upload').post(jwt.verifyAssessToken, upload.single('filePath'), videoControllers.uploadVideo);
router.route('/:id/views').patch(videoControllers.countingView);

export const videoRoutes = router;
