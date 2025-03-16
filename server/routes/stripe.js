const express = require('express');

const router = express.Router();
//middleware
const {requireSignIn} = require('../middlewares');
//controllers
const {createConnectAccount} = require('../controllers/stripe');


router.post('/create-connect-account', requireSignIn, createConnectAccount);


module.exports = router;