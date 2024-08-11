import express from 'express';
import { commentControllers } from '../../controllers';
import * as jwt from '../../middlewares/authorizationJWTMiddleWare';

const router = express.Router();

router.route('/:videoId').get(commentControllers.getCommentsVideo);
router.route('/').post(jwt.verifyAssessToken, commentControllers.postCommentVideo);

export const commentRoutes = router;
