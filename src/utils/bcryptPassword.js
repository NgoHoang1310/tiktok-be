import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = (plainTextPassword) => {
    const encodedPassword = bcrypt.hashSync(plainTextPassword, saltRounds);
    return encodedPassword;
};

const comparePassword = (plainTextPassword, hash) => {
    return bcrypt.compareSync(plainTextPassword, hash);
};
export { hashPassword, comparePassword };
