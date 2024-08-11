import Joi from 'joi';
import ApiError from '../utils/apiError';
import { StatusCodes } from 'http-status-codes';

const updateProfile = async (req, res, next) => {
    const schema = Joi.object({
        tiktokID: Joi.string().required(),
        nickName: Joi.string().required(),
    });

    const payload = req.body;

    try {
        if (req.userId !== req.params.id) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'You have not permision to update this user !');
        }
        await schema.validateAsync({ tiktokID: payload.tiktokID, nickName: payload.nickName });
        next();
    } catch (error) {
        next(error);
    }
};

export { updateProfile };
