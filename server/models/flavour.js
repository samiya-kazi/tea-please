const { Schema, model } = require('mongoose');

const flavourSchema = new Schema({
  name: {
    name: String,
    required: true
  }
});

const Flavour = model('Flavour', flavourSchema);

module.exports = { flavourSchema, Flavour };