const Order = require('../models/order');


async function getAllOrders (req, res) {
  try {
    if(req.user.isAdmin) {
      const orders = await Order.find({});
      res.status(200).send(orders);
    } else {
      res.status(401).send('You are unauthorized to see all orders.');
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
}


async function getOwnOrders (req, res) {
  try {
      const orders = await Order.find({userId: req.user._id});
      res.status(200).send(orders);
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
}



async function postOrder (req, res) {
  try {
    const { room, items } = req.body;
    const date = new Date();
    const status = 'created';

    const result = await Order.create({ userId: req.user._id, room, items, status, date });
    res.status(201).send(result);
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
}


async function changeOrderStatus (req, res) {
  try {
    if(req.user.isAdmin) {
      const { id, status } = req.params;
      const result = await Order.findByIdAndUpdate(id, {$set: { status: status }});
      res.status(200).send(result)
    } else {
      res.status(401).send('You are unauthorized to make changes to orders.');
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
}

async function deleteOrder (req, res) {
  try {
    if(req.user.isAdmin) {
      const { id } = req.params;
      const result = await Order.findByIdAndDelete(id);
      res.status(200).send(result)
    } else {
      res.status(401).send('You are unauthorized to make changes to orders.');
    }
  } catch (error) {
    res.status(500);
    res.send(error);
    console.log(error);
  }
}



module.exports = { 
  getAllOrders,
  getOwnOrders, 
  postOrder, 
  changeOrderStatus, 
  deleteOrder 
}