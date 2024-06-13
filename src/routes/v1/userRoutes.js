import express from 'express';
import { userControllers, searchControllers } from '../../controllers';
import * as jwt from '../../middlewares/authorizationJWTMiddleWare';

const router = express.Router();

router.route('/').get(jwt.verifyAssessToken, userControllers.getAUser);
router.route('/search').get(searchControllers.search);

export const userRoutes = router;
