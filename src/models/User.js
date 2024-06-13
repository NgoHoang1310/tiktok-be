import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        fullName: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, min: 6, require: true },
        nickName: { type: String },
        avatar: { type: String },
        bio: { type: String },
        tick: { type: Boolean, default: false },
        followingsCount: { type: Number, default: 0 },
        followersCount: { type: Number, default: 0 },
        likesCount: { type: Number, default: 0 },
        websiteUrl: { type: String },
        _destroy: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);

export default mongoose.model('User', User);
