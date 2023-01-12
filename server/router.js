const router = require('express').Router();
const orderController = require('./controllers/order');
const foodController = require('./controllers/food');
const userController = require('./controllers/user');
const authMiddleware = require('./middlewares/auth');

// Order routes
router.get('/order', authMiddleware, orderController.getAllOrders);
router.post('/order', authMiddleware, orderController.postOrder)
router.put('/order/:id/:status', authMiddleware, orderController.changeOrderStatus);
router.delete('/order/:id', authMiddleware, orderController.deleteOrder);
router.get('/user/orders', authMiddleware, orderController.getOwnOrders);

// Food routes
router.get('/food', authMiddleware, foodController.getAllFood);
router.post('/food', authMiddleware, foodController.postFood);


// User routes
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/admin/register', userController.registerAdmin);
router.get('/user/:id', authMiddleware, userController.getUserInfo);


module.exports = router;