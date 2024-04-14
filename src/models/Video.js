import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Video = new Schema(
    {
        uid: { type: String },
        filePath: { type: String },
        thumbPath: { type: String },
        description: { type: String },
        music: { type: String },
        allows: { type: Array },
        viewable: { type: String },
    },
    { timestamps: true, versionKey: false },
);

export default mongoose.model('Video', Video);
