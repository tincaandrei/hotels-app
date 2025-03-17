const express = require('express');

const router = express.Router();
//middleware
const {requireSignIn} = require('../middlewares');
//controllers
const {createConnectAccount, getAccountStatus, getAccountBalance, payoutSetting } = require('../controllers/stripe');


router.post('/create-connect-account', requireSignIn, createConnectAccount);
router.post('/get-account-status', requireSignIn, getAccountStatus)
router.post('/get-account-balance', requireSignIn, getAccountBalance)
router.post('/payout-setting', requireSignIn, payoutSetting)
module.exports = router;