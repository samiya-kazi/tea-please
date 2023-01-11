const { Schema, model } = require('mongoose');
const { flavourSchema } = require('./flavour');
const { foodSchema } = require('./food');

const orderItemSchema = new Schema({
  food: {
    type: foodSchema,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  selectedFlavour: {
    type: flavourSchema,
    required: true
  }
})

const orderSchema = new Schema({
  userId: {
    type: String,
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