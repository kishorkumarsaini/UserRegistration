const authController = require('../controller/authController');
const router = require('express').Router();

router.get('/login',authController.login);
router.post('/signIn',authController.signIn);


module.exports = router;