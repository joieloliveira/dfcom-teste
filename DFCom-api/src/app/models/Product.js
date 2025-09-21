import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

Product.plugin(mongoosePaginate);

export default mongoose.model('product', Product);