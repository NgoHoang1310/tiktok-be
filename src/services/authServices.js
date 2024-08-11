import ApiError from '../utils/apiError';
import { StatusCodes } from 'http-status-codes';

import dotenv from 'dotenv';
import User from '../models/User';
import { bcrypt } from '../utils';
import { generateAccessToken, generateRefreshToken } from '../utils';
import client from '../configs/connectRD';
dotenv.config();

// const handleAuthWithPlugin = (payload) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!payload?.uid || !payload?.fullName || !payload?.email) {
//                 reject({
//                     errCode: 1,
//                     errMessage: 'Missing data input !',
//                 });
//             } else {
//                 let data = {};
//                 if (payload.isNewUser) {
//                     console.log(payload);
//                     await User.create(payload);
//                 }
//                 data = await User.findOne({ uid: payload.uid });
//                 resolve({
//                     errCode: 0,
//                     errMessage: 'Authentication success !',
//                     data,
//                 });
//             }
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

const handleRegister = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};

            let user = await User.findOne({ $or: [{ email: payload.email }, { tiktokID: payload.tiktokID }] });
            if (user) {
                throw new ApiError(StatusCodes.CONFLICT, 'Email or TiktokID already exists. Please try again !');
            }

            let encodedPassword = bcrypt.hashPassword(payload.password);
            if (!encodedPassword) {
                throw new ApiError(StatusCodes.CONFLICT, 'Hash password error!');
            }

            data = await User.create({ ...payload, password: encodedPassword, nickName: payload.fullName });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

const handleLogin = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            let user = await User.findOne({ email: payload.email });
            if (!user) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'User not found !');
            }

            if (bcrypt.comparePassword(payload.password, user.password)) {
                let accessToken = generateAccessToken({ sub: user._id });
                let refreshToken = generateRefreshToken({ sub: user._id });

                await client.set(user._id.toString(), refreshToken, { EX: 604800 });

                data.accessToken = accessToken;
                data.refreshToken = refreshToken;
                resolve(data);
            } else {
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Password incorrect !');
            }
        } catch (error) {
            reject(error);
        }
    });
};

const handleRefreshToken = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId, refreshToken } = payload;

            const redisRefreshToken = await client.get(userId);

            if (!redisRefreshToken || refreshToken !== redisRefreshToken) {
                throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Invalid token !');
            }
            let accessToken = generateAccessToken({ sub: userId });
            resolve({ accessToken, refreshToken });
        } catch (error) {
            reject(error);
        }
    });
};

const handleLogout = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId } = payload;
            await client.del(userId);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetMe = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {};
            data = await User.findOne({ _id: payload }, { password: 0 });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export { handleRegister, handleLogin, handleLogout, handleGetMe, handleRefreshToken };
