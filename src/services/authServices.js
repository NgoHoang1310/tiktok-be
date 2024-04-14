import User from '../models/User';
const handleAuthWithPlugin = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!payload?.uid || !payload?.fullName || !payload?.email) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing data input !',
                });
            } else {
                let data = {};
                if (payload.isNewUser) {
                    console.log(payload);
                    await User.create(payload);
                }
                data = await User.findOne({ uid: payload.uid });
                resolve({
                    errCode: 0,
                    errMessage: 'Authentication success !',
                    data,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export { handleAuthWithPlugin };
