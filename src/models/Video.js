import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Video = new Schema(
    {
        userId: { type: ObjectId },
        filePath: { type: String },
        thumbPath: { type: String },
        description: { type: String },
        music: { type: String },
        allows: { type: Array },
        viewable: { type: String },
        _destroy: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);

export default mongoose.model('Video', Video);
