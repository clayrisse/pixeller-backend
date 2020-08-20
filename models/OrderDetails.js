const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const orderDetailsSchema = new Schema({
    orderNumber: Number,
    buyer: {type: Schema.Types.ObjectId, ref: 'User'},
    items: [{type: Schema.Types.ObjectId, ref: 'SellingPic'}],
    shippingAddress: { type: String, default:"", require},
    shippingName: { type: String, default:"", require},
    shippingPhoneNum: { type: String, default:"", require},
    dateOfOrder: Date,
    paying pethod: { type: String, enum: ['Paypal', 'ApplePay', 'Master Card', 'Visa'] },
    Order Summary: [{
        itemsSubtotal:{type: Number},
        shippingCost:{type: Number},
        totalBeforeTax: {type: Number},
        tax: {type: Number},
        grandTotal: {type: Number},

    }]

});

const OrderDetails = mongoose.model("OrderDetails", orderDetailsSchema);

module.exports = SellInfo;