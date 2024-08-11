import express from 'express';
import { reactionControllers } from '../../controllers';
import { createValidation } from '../../validations';
import * as jwt from '../../middlewares/authorizationJWTMiddleWare';

const router = express.Router();

// router.route('/').get(commentControllers.getCommentsVideo);
router.route('/').post(jwt.verifyAssessToken, createValidation.postReaction, reactionControllers.default.postReaction);
router.route('/').delete(jwt.verifyAssessToken, reactionControllers.default.retrieveReaction);

export const reactionRoutes = router;
