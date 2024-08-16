import { hashtagServices } from '../services';
import { StatusCodes } from 'http-status-codes';

class hashtagControllers {
    getHashtags = async (req, res, next) => {
        try {
            const payload = req.query;
            const data = await hashtagServices.default.handleGetHashtags(payload);
            return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data });
        } catch (error) {
            next(error);
        }
    };

    createHashtag = async (req, res, next) => {
        try {
            const payload = req.body;
            const data = await hashtagServices.default.handleCreateHashtag(payload);
            return res.status(StatusCodes.CREATED).json({ message: StatusCodes[StatusCodes.CREATED], data });
        } catch (error) {
            next(error);
        }
    };
}
export default new hashtagControllers();
