import User from '../models/User';
import ApiError from '../utils/apiError';
import { StatusCodes } from 'http-status-codes';
const handleSearch = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!payload?.q || !payload?.type) {
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid input !');
            } else {
                const keyWord = new RegExp(payload.q, 'i');
                let data = await User.find({ nickName: { $regex: keyWord } });
                resolve(data);
            }
        } catch (error) {
            reject(error);
        }
    });
};

export { handleSearch };
