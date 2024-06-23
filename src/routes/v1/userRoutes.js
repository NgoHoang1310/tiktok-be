import express from 'express';
import { userControllers, searchControllers } from '../../controllers';
import * as jwt from '../../middlewares/authorizationJWTMiddleWare';

const router = express.Router();

router.route('/').get(jwt.verifyAssessToken, userControllers.getAUser);
router.route('/:id/following/').get(jwt.verifyAssessToken, userControllers.getFollowings);
router.route('/:id/follow/').post(jwt.verifyAssessToken, userControllers.followAUser);
router.route('/:id/unfollow/').delete(jwt.verifyAssessToken, userControllers.unfollowAUser);
router.route('/search').get(searchControllers.search);

export const userRoutes = router;
