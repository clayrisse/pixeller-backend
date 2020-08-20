const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    
    username: { type: String, required: true },
    // lastName: { type: String, default:"" }, //how do I do to have this field require for seller and not a buyer
    // address: [{ type: String, default:"" }], 
    // phoneNum: { type: Number, default:"" },
    // email: {type: String, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, required: true, unique: true },
    password: { type: String, minlength: 6, required: true },

    // buyCheckout: [{type: Schema.Types.ObjectId, ref: 'SellingPic' }],
    // buyLater: [{type: Schema.Types.ObjectId, ref: 'SellingPic' }], 
    // // shipInfoID: [{type: Schema.Types.ObjectId, ref: 'Shipping' }],

    // seller: { type: Boolean, default: false },
    // sellerInfo: { type: String, required: true}, 
    // sellerContact: { type: String, required: true}, 
    // sellerAvatar: { type: String, default: '/images/icon-userdefault.png' },
    // sellingPic: [{ type: Schema.Types.ObjectId, ref: 'SellingPic' }],
     
});

const User = mongoose.model("User", userSchema);

module.exports = User;
