import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import User from './User';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;

const Follow = new Schema(
    {
        followerId: { type: ObjectId },
        followingId: { type: ObjectId },
        _destroy: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);

Follow.post('findOneAndUpdate', async (doc) => {
    await User.findByIdAndUpdate(doc.followerId, { $inc: { followingsCount: 1 } });
    await User.findByIdAndUpdate(doc.followingId, { $inc: { followersCount: 1 } });
});

Follow.post('findOneAndDelete', async (doc) => {
    await User.findByIdAndUpdate(doc.followerId, { $inc: { followingsCount: -1 } });
    await User.findByIdAndUpdate(doc.followingId, { $inc: { followersCount: -1 } });
});

Follow.plugin(mongoosePaginate);
Follow.plugin(aggregatePaginate, mongoosePaginate);

export default mongoose.model('Follow', Follow);
