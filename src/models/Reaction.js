import { ObjectId } from 'mongodb';
import Video from './Video';
import Comment from './Comment';
import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
const Schema = mongoose.Schema;

const Reaction = new Schema(
    {
        userId: { type: ObjectId },
        reactableId: { type: ObjectId },
        reactableType: { type: String },
        reactionType: { type: String },
        _destroy: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);

Reaction.plugin(aggregatePaginate);

Reaction.post('save', async (doc) => {
    if (doc.reactableType === 'Comment') {
        switch (doc.reactionType) {
            case 'like':
                await Comment.findByIdAndUpdate(doc.reactableId, { $inc: { likesCount: 1 } });
                break;
        }
        return;
    }
    switch (doc.reactionType) {
        case 'like':
            await Video.findByIdAndUpdate(doc.reactableId, { $inc: { likesCount: 1 } });
            break;
        case 'favourite':
            await Video.findByIdAndUpdate(doc.reactableId, { $inc: { favouritesCount: 1 } });
            break;
    }
});

Reaction.post('findOneAndDelete', async (doc) => {
    if (doc.reactableType === 'Comment') {
        switch (doc.reactionType) {
            case 'like':
                await Comment.findByIdAndUpdate(doc.reactableId, { $inc: { likesCount: -1 } });
                break;
        }
        return;
    }
    switch (doc.reactionType) {
        case 'like':
            await Video.findByIdAndUpdate(doc.reactableId, { $inc: { likesCount: -1 } });
            break;
        case 'favourite':
            await Video.findByIdAndUpdate(doc.reactableId, { $inc: { favouritesCount: -1 } });
            break;
    }
});

export default mongoose.model('Reaction', Reaction);
