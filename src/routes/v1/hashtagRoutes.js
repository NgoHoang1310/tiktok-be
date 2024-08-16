import express from 'express';
import { hashtagControllers } from '../../controllers';
import { createValidation } from '~/validations/';
import * as jwt from '../../middlewares/authorizationJWTMiddleWare';

const router = express.Router();

router.route('/').post(createValidation.createHashtag, hashtagControllers.default.createHashtag);
router.route('/').get(hashtagControllers.default.getHashtags);

export const hashtagRoutes = router;
