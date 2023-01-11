const router = require('express').Router();
const orderController = require('./controllers/order');
const foodController = require('./controllers/food');

// Order routes
router.get('/order', orderController.getAllOrders);
router.post('/order', orderController.postOrder)
router.put('/order/:id/:status', orderController.changeOrderStatus);

router.get('/food', foodController.getAllFood);
router.post('/food', foodController.postFood);

module.exports = router;