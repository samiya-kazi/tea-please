const { Schema, model } = require('mongoose');

const flavourSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const Flavour = model('Flavour', flavourSchema);

module.exports = { flavourSchema, Flavour };