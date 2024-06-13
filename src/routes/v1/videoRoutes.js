import express from 'express';
import { videoControllers } from '../../controllers';
import * as jwt from '../../middlewares/authorizationJWTMiddleWare';

import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.route('/').get(videoControllers.getVideos);
router.route('/upload').post(jwt.verifyAssessToken, upload.single('filePath'), videoControllers.uploadVideo);

export const videoRoutes = router;
