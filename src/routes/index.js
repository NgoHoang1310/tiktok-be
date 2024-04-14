import express from 'express';
import { authControllers, searchControllers, followControllers, videoControllers } from '../controllers';
import authorizationJWT from '../middlewares';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const route = (app) => {
    //search
    router.get('/api/users/search', searchControllers.search);
    //videos
    router.get('/api/videos', videoControllers.getListVideos);
    //auth
    router.use(authorizationJWT);
    router.post('/api/authentication', authControllers.authWithPlugin);

    //users

    router.post('/api/users/:uid/follow', followControllers.following);
    router.post('/api/videos', upload.single('filePath'), videoControllers.uploadVideo);
    //likes

    //comments

    //follow

    return app.use('/', router);
};
export default route;
