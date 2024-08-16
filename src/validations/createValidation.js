import Joi from 'joi';
import ApiError from '../utils/apiError';
import { StatusCodes } from 'http-status-codes';

const postReaction = async (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        reactableType: Joi.string().required(),
        reactableId: Joi.string().required(),
        reactionType: Joi.string().required(),
    });

    const payload = { userId: req.userId, ...req.body };

    try {
        await schema.validateAsync({
            userId: payload.userId,
            reactableType: payload.reactableType,
            reactableId: payload.reactableId,
            reactionType: payload.reactionType,
        });
        next();
    } catch (error) {
        next(error);
    }
};

const createHashtag = async (req, res, next) => {
    const schema = Joi.object({
        hashtag: Joi.string()
            .required()
            .pattern(new RegExp(/^[a-zA-Z0-9][^\.^\#^\s]+$/)),
    });

    const payload = req.body;

    try {
        await schema.validateAsync({
            hashtag: payload.hashtag,
        });
        next();
    } catch (error) {
        next(error);
    }
};

export { postReaction, createHashtag };
