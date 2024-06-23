import { videoServices } from '../services';
import { StatusCodes } from 'http-status-codes';

const uploadVideo = async (req, res, next) => {
    try {
        const payload = { ...req.body, ...req.file };
        const data = await videoServices.handleUploadVideo(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data });
    } catch (error) {
        next(error);
    }
};

const getVideos = async (req, res, next) => {
    try {
        const payload = req.query;
        const data = await videoServices.handleGetVideos(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data });
    } catch (error) {
        next(error);
    }
};

const getFollowingVideos = async (req, res, next) => {
    try {
        const payload = req.params;
        console.log(payload);
        const data = await videoServices.handleGetFollowingVideos(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data });
    } catch (error) {
        next(error);
    }
};

export { uploadVideo, getVideos, getFollowingVideos };
