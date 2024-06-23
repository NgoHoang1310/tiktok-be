import uploadFile from '../utils/uploadFile';
// import { db } from '../firebase/config';
import Video from '../models/Video';
import Follow from '../models/Follow';
import ApiError from '../utils/apiError';
import { StatusCodes } from 'http-status-codes';

const handleUploadVideo = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            console.log(payload);
            const response = await uploadFile(`videos`, payload);
            if (!response) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Upload Failed!');
            }
            data = await Video.create({ ...payload, filePath: response[0], thumbPath: response[1] });
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
            // const random = Math.floor(Math.random() * totalVideo);
            const limit = payload.limit;
            data = await Video.aggregate([
                { $match: { _destroy: false } },
                { $sample: { size: Number(limit) } },
                {
                    $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userInfo' },
                },
                {
                    $unwind: '$userInfo',
                },
            ]);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};
const handleGetFollowingVideos = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];
            const followingUsers = await Follow.find({ followerId: payload.userId });
            const followingIds = followingUsers.map((follow) => follow.followingId);
            // const random = Math.floor(Math.random() * totalVideo);
            const limit = payload.limit;
            data = await Video.aggregate([
                { $match: { _destroy: false, userId: { $in: followingIds } } },
                { $sample: { size: Number(limit) } },
                {
                    $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userInfo' },
                    $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userInfo' },
                },
                {
                    $unwind: '$userInfo',
                },
            ]);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export { handleUploadVideo, handleGetVideos, handleGetFollowingVideos };
