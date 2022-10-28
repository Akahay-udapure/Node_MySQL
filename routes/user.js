const router = require('express').Router();

const user = require('../controllers/user');

router.post('/register', user.register);

router.post('/login', user.login);

router.post('/findAll', user.findAll);

router.post('/forgetPassword', user.forgotPassword);

router.post('/otpVerify', user.verifyOTP);

router.put('/changePassword/:userId', user.changePassword);

router.get('/getDetailsByUserId', user.findOne);


module.exports = router;

