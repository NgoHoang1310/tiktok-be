import Hashtag from '../models/Hashtag';
import { StatusCodes } from 'http-status-codes';

class hashtagServices {
    handleGetHashtags(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                const hashtag = new RegExp(payload.q, 'i');
                let data = await Hashtag.find({ hashtag: { $regex: hashtag } });
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }

    handleCreateHashtag(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await Hashtag.create(payload);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }
}
export default new hashtagServices();
