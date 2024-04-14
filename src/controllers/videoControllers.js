import { videoServices } from '../services';

const uploadVideo = async (req, res) => {
    try {
        const payload = { ...req.body, ...req.file };
        const data = await videoServices.handleUploadVideo(payload);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

const getListVideos = async (req, res) => {
    try {
        const data = await videoServices.handleGetListVideos();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

export { uploadVideo, getListVideos };
