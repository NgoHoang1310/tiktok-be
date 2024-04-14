import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema(
    {
        uid: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        fullName: { type: String },
        email: { type: String },
        nickName: { type: String },
        avatar: { type: String },
        bio: { type: String },
        tick: { type: Boolean, default: false },
        followingsCount: { type: Number, default: 0 },
        followersCount: { type: Number, default: 0 },
        likesCount: { type: Number, default: 0 },
        websiteUrl: { type: String },
    },
    { timestamps: true, versionKey: false },
);

export default mongoose.model('User', User);
