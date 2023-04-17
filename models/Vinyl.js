import mongoose from "mongoose";

const vinylSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        slug: {type:String, required: true, unique: true},
        genre: {type:String, required: true},
        image: { type: String, required: true },
        price: { type: Number, required: true },
        artist: { type: String, required: true },
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        description: { type: String, required: true },
        isFeatured: {type: Boolean, default: false},
        banner: String
    }, {
        timestamps: true,
    }
)

const Vinyl = mongoose.models.Vinyl || mongoose.model('Vinyl', vinylSchema)
export default Vinyl