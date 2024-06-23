import admin from '../firebase/config';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ApiError from '../utils/apiError';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

const verifyAssessToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'No token provided !');
        }
        const accessToken = token.split('Bearer ')[1];
        const decoded = jwt.verify(accessToken, process.env.SECRET_TOKEN);
        req.userId = decoded.sub;
        req.token = accessToken;
        req.expire = decoded.exp;
        next();
    } catch (error) {
        next(error);
    }
};

const verifyRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.body?.refreshToken || req.query?.refreshToken;
        console.log(refreshToken);
        if (!refreshToken) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'No token provided !');
        }
        const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
        // await admin.auth().verifyIdToken(accessToken);
        req.userId = decoded.sub;
        req.refreshToken = refreshToken;
        req.expire = decoded.exp;
        next();
    } catch (error) {
        next(error);
    }
};

export { verifyAssessToken, verifyRefreshToken };
