import express from 'express';
import { userControllers, searchControllers } from '../../controllers';
import { updateValidation } from '../../validations';
import * as jwt from '../../middlewares/authorizationJWTMiddleWare';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage(), limits: { fieldSize: 1 * 1024 * 1024 * 1024 } });

const router = express.Router();

router.route('/').get(jwt.verifyAssessToken, userControllers.getAUser);
router
    .route('/:id')
    .patch(jwt.verifyAssessToken, upload.single('file'), updateValidation.updateProfile, userControllers.updateUser);
router.route('/:id/following/').get(jwt.verifyAssessToken, userControllers.getFollowingUsers);
router.route('/:tiktokID/profile').get(userControllers.getUserProfile);
router.route('/:id/follow/').post(jwt.verifyAssessToken, userControllers.followAUser);
router.route('/:id/unfollow/').delete(jwt.verifyAssessToken, userControllers.unfollowAUser);
router.route('/search').get(searchControllers.search);

export const userRoutes = router;
