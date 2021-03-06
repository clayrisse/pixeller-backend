const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const sellingPicSchema = new Schema({
    picture: { type: String, default: "./../wireframe-pixeller.jpg"}, //required: true 
    title: String,
    formats: { type: String, enum: ['3x5', '2x1', '2x3'] },
    tags: [{ type: String }],
    description: String,
    price: Number,
    artistInfo: String, //{type: Schema.Types.ObjectId, ref: 'User' },
    maxPrints: Number,
    date: Date,
    comments: [{
        review: String,
        creator: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 }
    }],
    soldPrints: [
        {
            buyer:[{ type: Schema.Types.ObjectId, ref: 'User' }], 
            quantity: Number
        }
    ]


});

const SellingPic = mongoose.model("SellingPic", sellingPicSchema);

module.exports = SellingPic;


// picture, title, formats, tags, description, price, maxPrints, date, soldPrints, comments, artistInfo, [{
//         review: String,
//         creator: { type: Schema.Types.ObjectId, ref: 'User' },
//         rating: { type: Number, min: 1, max: 5 }
//     }],
//     : 