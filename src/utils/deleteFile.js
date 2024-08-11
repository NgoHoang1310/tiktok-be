import admin from '../firebase/config';
import ApiError from './apiError';

const deleteFile = async (path) => {
    const bucket = admin.storage().bucket();
    const response = await bucket.file(path).delete();
    console.log(response);
};
export default deleteFile;
