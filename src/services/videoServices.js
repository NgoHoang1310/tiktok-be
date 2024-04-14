import uploadFile from '../utils/uploadFile';
// import { db } from '../firebase/config';
import Video from '../models/Video';
const handleUploadVideo = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!payload.uid) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing data input !',
                });
            } else {
                let data = {};
                const response = await uploadFile('videos', payload);
                if (!response) {
                    reject();
                }
                data = await Video.create({ ...payload, filePath: response });
                resolve({
                    errCode: 0,
                    errMessage: 'Upload complete !',
                    data,
                });
                // // const [url] = await blob.getSignedUrl({
                //     action: 'read',
                //     expires: Date.now() + 3600 * 1000, // 1 giờ
                // });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetListVideos = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];

            data = await Video.aggregate([
                {
                    $lookup: { from: 'users', localField: 'uid', foreignField: 'uid', as: 'userInfo' },
                },
                {
                    $unwind: '$userInfo',
                },
            ]);
            // data = await Video.find().populate('userInfo', 'uid');

            resolve({
                errCode: 0,
                errMessage: 'Get list videos complete !',
                data,
            });
        } catch (error) {
            reject(error);
        }
    });
};

export { handleUploadVideo, handleGetListVideos };
