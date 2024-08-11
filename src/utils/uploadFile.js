import admin from '../firebase/config';
import { getDownloadURL } from 'firebase-admin/storage';
import ApiError from './apiError';

// const uploadFile = (path, data) => {
//     const bucket = admin.storage().bucket();
//     if (data?.size === 0) {
//         throw new ApiError('No file or empty file data provided.');
//     }
//     const video = bucket.file(`${path}/u_${data.userId}/${data.description}_video`);
//     const thumbnail = bucket.file(`${path}/u_${data.userId}/${data.description}_thumbnail`);
//     const videoWriter = video.createWriteStream({
//         metadata: {
//             contentType: data.mimetype,
//         },
//         gzip: true,
//     });
//     const thumbnailWriter = thumbnail.createWriteStream({
//         metadata: {
//             contentType: 'image/jpeg',
//         },
//         gzip: true,
//     });

//     const videoUploadPromise = new Promise((resolve, reject) => {
//         videoWriter.on('finish', async () => {
//             try {
//                 const videoURL = await getDownloadURL(video);
//                 resolve(videoURL);
//             } catch (error) {
//                 reject(error);
//             }
//         });

//         videoWriter.on('error', (err) => {
//             reject(err);
//         });

//         videoWriter.end(data.buffer); // Kết thúc ghi dữ liệu vào videoWriter
//     });

//     const thumbnailUploadPromise = new Promise((resolve, reject) => {
//         thumbnailWriter.on('finish', async () => {
//             try {
//                 const thumbnailURL = await getDownloadURL(thumbnail);
//                 resolve(thumbnailURL);
//             } catch (error) {
//                 reject(error);
//             }
//         });

//         thumbnailWriter.on('error', (err) => {
//             reject(err);
//         });

//         thumbnailWriter.end(Buffer.from(data?.thumbPath, 'base64')); // Kết thúc ghi dữ liệu vào thumbnailWriter
//     });

//     return Promise.all([videoUploadPromise, thumbnailUploadPromise]);
// };

const uploadFileToBucket = (file, buffer) => {
    return new Promise((resolve, reject) => {
        const writer = file.createWriteStream({
            metadata: {
                contentType: file.metadata.contentType,
            },
            gzip: true,
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
