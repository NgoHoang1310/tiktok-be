import Reaction from '../models/Reaction';
import { StatusCodes } from 'http-status-codes';

class reactionServices {
    handlePostReaction(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {};
                data = await Reaction.create(payload);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }

    handleRetrieveReaction(payload) {
        return new Promise(async (resolve, reject) => {
            try {
                let data = {};
                data = await Reaction.findOneAndDelete(payload);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }
}
export default new reactionServices();
