import { db } from '../firebase/config';
import User from '../models/User';

const handleSearch = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!payload?.q || !payload?.type) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing data input !',
                });
            } else {
                const keyWord = new RegExp(payload.q, 'i');
                let data = await User.find({ nickName: { $regex: keyWord } });
                resolve({
                    errCode: 0,
                    errMessage: 'Searching complete !',
                    data,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export { handleSearch };
