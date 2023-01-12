const router = require('express').Router();
const orderController = require('./controllers/order');
const foodController = require('./controllers/food');
const userController = require('./controllers/user');
const authMiddleware = require('./middlewares/auth');

// Order routes
router.get('/order', authMiddleware, orderController.getAllOrders);
router.post('/order', authMiddleware, orderController.postOrder)
router.put('/order/:id/:status', authMiddleware, orderController.changeOrderStatus);

// Food routes
router.get('/food', authMiddleware, foodController.getAllFood);
router.post('/food', authMiddleware, foodController.postFood);


// User routes
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/admin/register', userController.registerAdmin);

module.exports = router;