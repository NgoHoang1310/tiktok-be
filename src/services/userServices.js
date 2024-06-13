import { log } from 'firebase-functions/logger';
import User from '../models/User';

const handleGetAUser = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            data = await User.findOne({ _id: payload?.sub });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export { handleGetAUser };
