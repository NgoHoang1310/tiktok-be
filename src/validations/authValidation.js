import Joi from 'joi';

const register = async (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        nickName: Joi.string().required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });

    const payload = req.body;

    try {
        await schema.validateAsync({
            fullName: payload.fullName,
            nickName: payload.nickName,
            email: payload.email,
            password: payload.password,
        });
        next();
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });

    const payload = req.body;

    try {
        await schema.validateAsync({ email: payload.email, password: payload.password });
        next();
    } catch (error) {
        next(error);
    }
};
export { register, login };
