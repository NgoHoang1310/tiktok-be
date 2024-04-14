import { followServices } from '../services';

const following = async (req, res) => {
    try {
        const payload = req.params.uid;
        console.log(payload);
        // const data = await followingServices.handlefollowing(payload);
        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

export { following };
