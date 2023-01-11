const router = require('express').Router();
const orderController = require('./controllers/order');
const foodController = require('./controllers/food');
const userController = require('./controllers/user');

// Order routes
router.get('/order', orderController.getAllOrders);
router.post('/order', orderController.postOrder)
router.put('/order/:id/:status', orderController.changeOrderStatus);

// Food routes
router.get('/food', foodController.getAllFood);
router.post('/food', foodController.postFood);


// User routes
router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;