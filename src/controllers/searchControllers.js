import { searchServices } from '../services';
import { StatusCodes } from 'http-status-codes';

const search = async (req, res, next) => {
    try {
        const payload = req.query;
        const data = await searchServices.handleSearch(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data });
    } catch (error) {
        next(error);
    }
};

export { search };
