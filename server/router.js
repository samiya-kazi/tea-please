const router = require('express').Router();

// Order routes
router.get('/order')
router.post('/order')
router.put('/order/:id/:status');

module.exports = router;