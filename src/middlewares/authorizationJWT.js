import admin from '../firebase/config';

const authorizationJWT = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const accessToken = token.split('Bearer ')[1];
            await admin.auth().verifyIdToken(accessToken);
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                message: 'Unauthorized !',
            });
        }
    } else {
        return res.status(403).json({
            message: 'No token provided !',
        });
    }
};

export default authorizationJWT;
