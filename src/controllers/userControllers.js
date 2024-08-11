import { userServices } from '../services';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/apiError';
import { userControllers } from '.';

const getAUser = async (req, res, next) => {
    try {
        const payload = req.params;
        const data = await userServices.handleGetAUser(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data });
    } catch (error) {
        next(error);
    }
};

const getUserProfile = async (req, res, next) => {
    try {
        const payload = { ...req.params, ...req.query };
        const data = await userServices.handleGetUserProfile(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const payload = { userId: req.params.id, ...req.body, ...req.file };
        const data = await userServices.handleUpdateUser(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data });
    } catch (error) {
        next(error);
    }
};

const followAUser = async (req, res, next) => {
    try {
        const payload = { followingId: req.params.id, followerId: req.userId };
        const data = await userServices.handleFollowAUser(payload);
        return res.status(StatusCodes.CREATED).json({ message: StatusCodes[StatusCodes.CREATED], data });
    } catch (error) {
        next(error);
    }
};
const unfollowAUser = async (req, res, next) => {
    try {
        const payload = { followingId: req.params.id, followerId: req.userId };
        const data = await userServices.handleUnFollowAUser(payload);
        if (!data) throw new ApiError(StatusCodes.NO_CONTENT, 'No content to delete !');
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data });
    } catch (error) {
        next(error);
    }
};

const getFollowingUsers = async (req, res, next) => {
    try {
        const payload = { ...req.params, ...req.query };
        const { data, pagination } = await userServices.handleGetFollowingUsers(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data, pagination });
    } catch (error) {
        next(error);
    }
};

export { getAUser, updateUser, getUserProfile, followAUser, unfollowAUser, getFollowingUsers };
