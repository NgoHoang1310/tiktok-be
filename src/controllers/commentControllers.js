import { commentServices } from '../services';
import { StatusCodes } from 'http-status-codes';

const getCommentsVideo = async (req, res, next) => {
    try {
        const payload = { ...req.params, ...req.query };
        const { data, pagination } = await commentServices.handleGetCommentsVideo(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data, pagination });
    } catch (error) {
        next(error);
    }
};

const postCommentVideo = async (req, res, next) => {
    try {
        const io = req.io;
        const payload = { userId: req.userId, ...req.body };
        const data = await commentServices.handlePostCommentVideo(payload);
        io.emit(`video-${data?.data[0]?.videoId}`, data);
        return res.status(StatusCodes.CREATED).json({ message: StatusCodes[StatusCodes.CREATED], data });
    } catch (error) {
        next(error);
    }
};

export { getCommentsVideo, postCommentVideo };
