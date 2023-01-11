const { Schema, model } = require('mongoose');
const { foodSchema } = require('./food');
const { userSchema } = require('./user');

const orderItemSchema = new Schema({
  food: {
    type: foodSchema,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
})

const orderSchema = new Schema({
  user: {
    type: userSchema,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  items: {
    type: [orderItemSchema],
    default: []
  },
  date: {
    type: Date,
    default: new Date()
  }
})


const Order = model('Order', orderSchema);

module.exports = Order;