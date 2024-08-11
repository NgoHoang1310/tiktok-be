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
        const payload = { ...req.query };
        const { data, pagination } = await videoServices.handleGetVideos(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data, pagination });
    } catch (error) {
        next(error);
    }
};

const getVideosProfile = async (req, res, next) => {
    try {
        const payload = { userId: req.params.id, ...req.query };
        const { data, pagination } = await videoServices.handleGetVideosProfile(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data, pagination });
    } catch (error) {
        next(error);
    }
};

const getVideosForyou = async (req, res, next) => {
    try {
        const payload = { userId: req.userId, ...req.query };
        const { data, pagination } = await videoServices.handleGetVideosForyou(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data, pagination });
    } catch (error) {
        next(error);
    }
};

const getFollowingVideos = async (req, res, next) => {
    try {
        const payload = { ...req.params, ...req.query };
        const { data, pagination } = await videoServices.handleGetFollowingVideos(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data, pagination });
    } catch (error) {
        next(error);
    }
};

const countingView = async (req, res, next) => {
    try {
        const payload = req.params;
        const data = await videoServices.handleCountingView(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data });
    } catch (error) {
        next(error);
    }
};

export { uploadVideo, getVideos, getVideosProfile, getVideosForyou, getFollowingVideos, countingView };
