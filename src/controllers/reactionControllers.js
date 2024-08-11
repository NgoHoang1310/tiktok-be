import { reactionServices } from '../services';
import { StatusCodes } from 'http-status-codes';

class reactionControllers {
    async postReaction(req, res, next) {
        try {
            const payload = { userId: req.userId, ...req.body };
            const data = await reactionServices.default.handlePostReaction(payload);
            return res.status(StatusCodes.CREATED).json({ message: StatusCodes[StatusCodes.CREATED], data });
        } catch (error) {
            next(error);
        }
    }

    async retrieveReaction(req, res, next) {
        try {
            const payload = { userId: req.userId, ...req.body };
            const data = await reactionServices.default.handleRetrieveReaction(payload);
            return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data });
        } catch (error) {
            next(error);
        }
    }
}

export default new reactionControllers();
