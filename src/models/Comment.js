import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import Video from './Video';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        videoId: { type: ObjectId },
        userId: { type: ObjectId, ref: 'User' },
        parentId: { type: ObjectId, default: null },
        content: { type: String },
        _destroy: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);

Comment.plugin(aggregatePaginate);

Comment.post('save', async (doc) => {
    await Video.findByIdAndUpdate(doc.videoId, { $inc: { commentsCount: 1 } });
});

export default mongoose.model('Comment', Comment);
