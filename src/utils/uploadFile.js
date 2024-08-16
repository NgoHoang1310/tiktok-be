import admin from '../firebase/config';
import { getDownloadURL } from 'firebase-admin/storage';
import ApiError from './apiError';

const uploadFileToBucket = (file, buffer) => {
    return new Promise((resolve, reject) => {
        const writer = file.createWriteStream({
            metadata: {
                contentType: file.metadata.contentType,
            },
            // gzip: true,
        });

        writer.on('finish', async () => {
            try {
                const url = await getDownloadURL(file);
                resolve(url);
            } catch (error) {
                reject(new ApiError('Failed to get download URL', error));
            }
        });

        writer.on('error', (err) => {
            reject(new ApiError('Failed to upload file', err));
        });

        writer.end(buffer);
    });
};

const uploadFile = async (path, data) => {
    const bucket = admin.storage().bucket();

    if (!data || data.size === 0) {
        throw new ApiError('No file or empty file data provided.');
    }

    const uploadPromises = [];

    if (data.mimetype == 'video/mp4') {
        const videoPath = `${path}/u_${data.userId}/${data.description}_video`;
        const videoFile = bucket.file(videoPath);
        videoFile.metadata = { contentType: data.mimetype };

        const videoUploadPromise = uploadFileToBucket(videoFile, data.buffer);
        uploadPromises.push(videoUploadPromise);
    }

    if (data.mimetype == 'image/jpeg' || data.mimetype == 'image/png') {
        const [files] = await bucket.getFiles({ prefix: `${path}/u_${data.userId}` });
        if (files.length !== 0) await files[0].delete();
        const videoPath = `${path}/u_${data.userId}/${data.originalname}`;
        const videoFile = bucket.file(videoPath);
        videoFile.metadata = { contentType: data.mimetype };
        const videoUploadPromise = uploadFileToBucket(videoFile, data.buffer);
        uploadPromises.push(videoUploadPromise);
    }

    if (data.thumbPath) {
        const thumbnailPath = `${path}/u_${data.userId}/${data.description}_thumbnail`;
        const thumbnailFile = bucket.file(thumbnailPath);
        thumbnailFile.metadata = { contentType: 'image/jpeg' };

        const thumbnailUploadPromise = uploadFileToBucket(thumbnailFile, Buffer.from(data.thumbPath, 'base64'));
        uploadPromises.push(thumbnailUploadPromise);
    }

    try {
        const urls = await Promise.all(uploadPromises);
        return urls;
    } catch (error) {
        throw new ApiError('Failed to upload files', error);
    }
};
export default uploadFile;
