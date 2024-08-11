import { authServices } from '../services';
import { StatusCodes } from 'http-status-codes';

const authWithPlugin = async (req, res) => {
    try {
        const payload = req.body;
        const data = await authServices.handleAuthWithPlugin(payload);
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        const payload = req.body;
        const data = await authServices.handleRegister(payload);
        return res.status(StatusCodes.CREATED).json({ message: StatusCodes[StatusCodes.CREATED], data: data });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const payload = req;
        const data = await authServices.handleRefreshToken(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data: data });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const payload = req.body;
        const data = await authServices.handleLogin(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data: data });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const payload = req;
        await authServices.handleLogout(payload);
        return res.status(StatusCodes.OK).json({ message: 'Log out successfully !' });
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const payload = req.userId;
        const data = await authServices.handleGetMe(payload);
        return res.status(StatusCodes.OK).json({ message: StatusCodes[StatusCodes.OK], data: data });
    } catch (error) {
        next(error);
    }
};

export { authWithPlugin, register, login, logout, getMe, refreshToken };
