import { searchServices } from '../services';

const search = async (req, res) => {
    try {
        const payload = req.query;
        const data = await searchServices.handleSearch(payload);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server',
        });
    }
};

export { search };
