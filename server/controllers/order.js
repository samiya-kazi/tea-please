const Order = require('../models/order');


async function getAllOrders (req, res) {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
}


async function postOrder (req, res) {
  try {
    const { userId, room, items } = req.body;
    const date = new Date();
    const status = 'created';

    const result = await Order.create({ userId, room, items, status, date });
    res.status(201).send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
}


async function changeOrderStatus (req, res) {
  try {
    const { id, status } = req.params;
    const result = Order.findByIdAndUpdate(id, {$set: { status: status }});
    res.status(200).send(result)
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
}


module.exports = { getAllOrders, postOrder, changeOrderStatus }