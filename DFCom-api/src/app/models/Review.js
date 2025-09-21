import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Review = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    });

Review.plugin(mongoosePaginate);

export default mongoose.model('review', Review);