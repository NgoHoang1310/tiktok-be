import mongoose from 'mongoose';
import User from '../models/User';
import Follow from '../models/Follow';
import ApiError from '../utils/apiError';
import { StatusCodes } from 'http-status-codes';
import uploadFile from '../utils/uploadFile';
import deleteFile from '../utils/deleteFile';

const handleGetAUser = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            data = await User.findOne({ _id: payload });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetUserProfile = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            data = await User.findOne({ _destroy: false, tiktokID: payload.tiktokID }, { password: 0 });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

const handleUpdateUser = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            const response = await uploadFile(`avatars`, payload);
            if (!response) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Upload Failed!');
            }

            data = await User.findOneAndUpdate(
                { _id: payload.userId },
                { tiktokID: payload.tiktokID, avatar: response[0], nickName: payload.nickName, bio: payload.bio },
                { new: true },
            );
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

const handleUnFollowAUser = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            if (payload.followerId == payload.followingId)
                throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Cannot follow yourself !');
            data = await Follow.findOneAndDelete({ ...payload });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

const handleFollowAUser = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            if (payload.followerId == payload.followingId)
                throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Cannot follow yourself !');
            data = await Follow.findOneAndUpdate(payload, payload, { new: true, upsert: true });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetFollowingUsers = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];

            const options = {
                page: payload.page || 1,
                limit: payload.limit || 3,
                customLabels: {
                    meta: 'paginator',
                },
                sort: {
                    [payload.sort || 'createdAt']: payload.order || 'desc',
                },
            };

            const filter = {
                followerId: new mongoose.Types.ObjectId(payload),
            };

            const pipeline = [
                {
                    $match: filter,
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'followingId',
                        foreignField: '_id',
                        as: 'userInfo',
                    },
                },
                {
                    $unwind: '$userInfo',
                },
            ];
            data = await Follow.aggregatePaginate(Follow.aggregate(pipeline), options);
            resolve({ data: data.docs, pagination: data.paginator });
        } catch (error) {
            reject(error);
        }
    });
};
export {
    handleGetAUser,
    handleUpdateUser,
    handleGetUserProfile,
    handleFollowAUser,
    handleUnFollowAUser,
    handleGetFollowingUsers,
};
