const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const sellingPicSchema = new Schema({
    picture: { type: String, default: '/images/icon-userdefault.png' },
    title: String,
    formats: { type: String, enum: ['3x5', '2x1', '2x3'] },
    tags: [{ type: String }],
    description: String,
    price: Number,
    artistInfo: {type: Schema.Types.ObjectId, ref: 'User.sellerName' },
    maxPrints: Number,
    date: Date,
    comments: [{
        review: String,
        creator: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 }}],
    soldPrints: [{ type: Schema.Types.ObjectId, ref: 'User' 
    }]


});

const SellingPic = mongoose.model("SellingPic", sellingPicSchema);

module.exports = SellingPic;