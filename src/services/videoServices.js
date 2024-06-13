import uploadFile from '../utils/uploadFile';
// import { db } from '../firebase/config';
import Video from '../models/Video';
import ApiError from '../utils/apiError';
import { StatusCodes } from 'http-status-codes';
import { log } from 'firebase-functions/logger';

const ITEMS_PER_PAGE = 2;

const handleUploadVideo = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            console.log(payload);
            const response = await uploadFile('videos', payload);
            if (!response) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Upload Failed!');
            }
            data = await Video.create({ ...payload, filePath: response });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetVideos = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];
            const skip = (payload.page - 1) * payload.limit || 0;
            const limit = payload.limit || 5;
            console.log(typeof skip);
            data = await Video.aggregate([
                { $match: { _destroy: false } },
                {
                    $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userInfo' },
                },
                {
                    $unwind: '$userInfo',
                },
                {
                    $skip: skip,
                },
                {
                    $limit: Number(limit),
                },
            ]);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export { handleUploadVideo, handleGetVideos };
