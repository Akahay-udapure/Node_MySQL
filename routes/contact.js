const router = require('express').Router();

const contact = require('../controllers/contact');

router.post('/add', contact.add);


module.exports = router;

