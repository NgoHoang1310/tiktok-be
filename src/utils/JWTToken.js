import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: '1m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.SECRET_REFRESH_TOKEN, { expiresIn: '7d' });
};

export { generateAccessToken, generateRefreshToken };
