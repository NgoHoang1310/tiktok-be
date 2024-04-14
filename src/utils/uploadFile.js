import admin from '../firebase/config';
import { getDownloadURL } from 'firebase-admin/storage';

const uploadFile = async (path, data) => {
    return new Promise((resolve, reject) => {
        const bucket = admin.storage().bucket();
        if (data?.size === 0) {
            reject();
        }
        const blob = bucket.file(`${path}/${data.originalname}`);
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: data.mimetype,
            },
        });
        blobWriter.end(data.buffer);
        blobWriter.on('finish', async () => {
            resolve(getDownloadURL(blob));
        });
        blobWriter.on('error', (err) => {
            reject(err);
        });
    });
};

export default uploadFile;
