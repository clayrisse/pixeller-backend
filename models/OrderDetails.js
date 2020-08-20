const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const orderDetailsSchema = new Schema({
    orderNumber: String,
    buyer: {type: Schema.Types.ObjectId, ref: 'User'},
    items: [{type: Schema.Types.ObjectId, ref: 'SellingPic'}],
    shippingAddress: { type: String, required: true},
    shippingName: { type: String, required: true},
    shippingPhoneNum: { type: String, required: true},
    dateOfOrder: Date,
    payingPethod: { type: String, enum: ['Paypal', 'ApplePay', 'MasterCard', 'Visa'] },
    orderSummary: [{
        itemsSubtotal:{type: Number},
        shippingCost:{type: Number},
        totalBeforeTax: {type: Number},
        tax: {type: Number},
        grandTotal: {type: Number},

    }]

});

const OrderDetails = mongoose.model("OrderDetails", orderDetailsSchema);

module.exports = SellInfo;