import mongoose from 'mongoose'

// Create model schema
const opts = { toJSON: { virtuals: true } };
const CategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    category_image: {
        type: String,
        required: true
    },
    category_slug: {
        type: String,
    }
}, opts)

export default mongoose.model('Category', CategorySchema);