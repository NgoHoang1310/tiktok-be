import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';

const Hashtag = new Schema(
    {
        hashtag: { type: String, default: null },
        _destroy: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);
Hashtag.plugin(mongoosePaginate);
Hashtag.plugin(aggregatePaginate, mongoosePaginate);
export default mongoose.model('Hashtag', Hashtag);
