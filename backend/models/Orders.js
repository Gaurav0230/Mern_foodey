const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  order_data: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        }
      },
    ],
    required: true,
  },
});

const OrderModel = mongoose.model("order", OrderSchema);
module.exports = { OrderModel };
