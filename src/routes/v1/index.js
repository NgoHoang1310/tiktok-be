import express from 'express';
import { authRoutes } from './authRoutes.js';
import { videoRoutes } from './videoRoutes';
import { userRoutes } from './userRoutes.js';
// import authorizationJWT from '../../middlewares';

import { authControllers, searchControllers, followControllers, videoControllers } from '../../controllers';
// import authorizationJWT from '../../middlewares/authorizationJWTMiddleWare.js';

const router = express.Router();
// router.use(authorizationJWT);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/videos', videoRoutes);

// const route = (app) => {
//     //search
//     // router.get('/api/users/search', searchControllers.search);
//     // //videos
//     // router.get('/api/videos', videoControllers.getListVideos);
//     // //auth
//     // router.use(authorizationJWT);
//     // router.post('/api/authentication', authControllers.authWithPlugin);
//     // //users
//     // router.post('/api/users/:uid/follow', followControllers.following);
// router.post('/api/videos', upload.single('filePath'), videoControllers.uploadVideo);
//     //likes
//     //comments
//     //follow
// };
export const APIs_V1 = router;
