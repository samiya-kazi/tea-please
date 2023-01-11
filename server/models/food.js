const { Schema, model } = require('mongoose');
const { flavourSchema } = require('./flavour');

const foodSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  flavour : {
    type: flavourSchema,
    required: true
  },
  size: {
    type: String
  }
})


const Food = model('Food', foodSchema);

module.exports = { Food, foodSchema };