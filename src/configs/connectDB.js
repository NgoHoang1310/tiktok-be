import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://ngohoang1310:13102003@tiktok-clone.tbxopin.mongodb.net/TikTok', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully!');
    } catch (error) {
        console.log('Connect failure!');
    }
};

export { connect };
