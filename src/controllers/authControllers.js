import { authServices } from '../services';

const authWithPlugin = async (req, res) => {
    try {
        const payload = req.body;
        const data = await authServices.handleAuthWithPlugin(payload);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

export { authWithPlugin };
