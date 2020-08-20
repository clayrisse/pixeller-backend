const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    
    name: { type: String, required: true },
    lastName: { type: String, default:"", require}, //how do I do to have this field require for seller and not a buyer
    address: [{ type: String, default:"", require}], 
    phoneNum: { type: Number, default:"", require},
    email: {type: String, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, required: true, unique: true },
    password: { type: String, minlength: 6, required: true },

    buyerCheckout: [{type: Schema.Types.ObjectId, ref: 'SellingPrint' }],
    buyerCar: [{type: Schema.Types.ObjectId, ref: 'SellingPrint' }], 
    shipInfoID: [{type: Schema.Types.ObjectId, ref: 'Shipping' }], 

    seller: { type: Boolean, default: false },
    sellerInfo: { type: String, default:"", require}, 
    sellerContact: { type: String, default:"", require}, 
    sellerAvatar: { type: String, default: '/images/icon-userdefault.png' },
    sellingPic: [{ type: Schema.Types.ObjectId, ref: 'SellingPrint' }],
     
});

const User = mongoose.model("User", userSchema);

module.exports = User;
