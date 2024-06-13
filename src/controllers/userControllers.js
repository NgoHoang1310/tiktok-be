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

export { getAUser };
