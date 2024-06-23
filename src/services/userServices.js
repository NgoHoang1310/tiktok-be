import { log } from 'firebase-functions/logger';
import User from '../models/User';
import Follow from '../models/Follow';
import ApiError from '../utils/apiError';
import { StatusCodes } from 'http-status-codes';

const handleGetAUser = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            data = await User.findOne({ _id: payload?.sub });
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

const handleGetFollowings = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];
            data = await Follow.find({ followerId: payload });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};
export { handleGetAUser, handleFollowAUser, handleUnFollowAUser, handleGetFollowings };
