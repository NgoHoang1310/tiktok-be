import { userServices } from '../services';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/apiError';

const getAUser = async (req, res, next) => {
    try {
        const payload = req.query;
        const data = await userServices.handleGetAUser(payload);
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

const getFollowings = async (req, res, next) => {
    try {
        const payload = req.params.id;
        const data = await userServices.handleGetFollowings(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data });
    } catch (error) {
        next(error);
    }
};

export { getAUser, followAUser, unfollowAUser, getFollowings };
