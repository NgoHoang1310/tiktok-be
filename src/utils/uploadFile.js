import admin from '../firebase/config';
import { getDownloadURL } from 'firebase-admin/storage';
import ApiError from './apiError';

const uploadFile = (path, data) => {
    const bucket = admin.storage().bucket();
    if (data?.size === 0) {
        throw new ApiError('No file or empty file data provided.');
    }
    const video = bucket.file(`${path}/u_${data.userId}/${data.description}_video`);
    const thumbnail = bucket.file(`${path}/u_${data.userId}/${data.description}_thumbnail`);
    const videoWriter = video.createWriteStream({
        metadata: {
            contentType: data.mimetype,
        },
        gzip: true,
    });
    const thumbnailWriter = thumbnail.createWriteStream({
        metadata: {
            contentType: 'image/jpeg',
        },
        gzip: true,
    });

    const videoUploadPromise = new Promise((resolve, reject) => {
        videoWriter.on('finish', async () => {
            try {
                const videoURL = await getDownloadURL(video);
                resolve(videoURL);
            } catch (error) {
                reject(error);
            }
        });

        videoWriter.on('error', (err) => {
            reject(err);
        });

        videoWriter.end(data.buffer); // Kết thúc ghi dữ liệu vào videoWriter
    });

    const thumbnailUploadPromise = new Promise((resolve, reject) => {
        thumbnailWriter.on('finish', async () => {
            try {
                const thumbnailURL = await getDownloadURL(thumbnail);
                resolve(thumbnailURL);
            } catch (error) {
                reject(error);
            }
        });

        thumbnailWriter.on('error', (err) => {
            reject(err);
        });

        thumbnailWriter.end(Buffer.from(data?.thumbPath, 'base64')); // Kết thúc ghi dữ liệu vào thumbnailWriter
    });

    return Promise.all([videoUploadPromise, thumbnailUploadPromise]);
};

export default uploadFile;
