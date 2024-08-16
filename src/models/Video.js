import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';

const Video = new Schema(
    {
        userId: { type: ObjectId },
        filePath: { type: String },
        thumbPath: { type: String },
        description: { type: String },
        music: { type: String },
        allows: { type: Array },
        hashtags: { type: Array },
        viewable: { type: String },
        viewsCount: { type: Number, default: 0 },
        commentsCount: { type: Number, default: 0 },
        likesCount: { type: Number, default: 0 },
        sharesCount: { type: Number, default: 0 },
        favouritesCount: { type: Number, default: 0 },
        _destroy: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);
Video.plugin(mongoosePaginate);
Video.plugin(aggregatePaginate, mongoosePaginate);
export default mongoose.model('Video', Video);
