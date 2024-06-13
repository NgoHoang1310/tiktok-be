import express from 'express';
import { authValidation } from '../../validations';
import { authControllers } from '../../controllers';
import * as jwt from '../../middlewares/authorizationJWTMiddleWare';

const router = express.Router();

router.route('/register').post(authValidation.register, authControllers.register);
router.route('/login').post(authValidation.login, authControllers.login);
router.route('/logout').delete(jwt.verifyRefreshToken, authControllers.logout);
router.route('/refresh-token').post(jwt.verifyRefreshToken, authControllers.refreshToken);
router.route('/me').get(jwt.verifyAssessToken, authControllers.getMe);

export const authRoutes = router;
