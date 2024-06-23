import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Follow = new Schema(
    {
        followerId: { type: ObjectId },
        followingId: { type: ObjectId },
        _destroy: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);

export default mongoose.model('Follow', Follow);
