const { Food } = require('../models/food');


async function getAllFood (req, res) {
  try {
    const food = await Food.find({});
    res.status(200).send(food);
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
}


async function postFood (req, res) {
  try {
    const { name, flavours, size } = req.body;
    const result = await Food.create({ name, flavours, size });
    res.status(201).send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
}

module.exports = { getAllFood, postFood }