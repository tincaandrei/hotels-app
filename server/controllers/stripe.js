const User = require('../models/user');
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET);

const createConnectAccount = async (req, res) => {
    try {
      // Find the user from the DB
      const user = await User.findById(req.user._id).exec();
      console.log("USER ==>", user);
  
      // If user does not have a Stripe account, create one
      let account;
      if (!user.stripe_account_id) {
        account = await stripe.accounts.create({ type: "express" });
        user.stripe_account_id = account.id;
        await user.save();
      }
      console.log("ACCOUNT ==>", account || user.stripe_account_id);
  
      // Create a login link for onboarding
      let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: 'account_onboarding',
      });
      
      // Merge in additional information if needed (like prefill email)
      accountLink = Object.assign(accountLink, {
        "stripe_user[email]": user.email || undefined,
      });
      console.log('ACCOUNT LINK', accountLink);
  
      // Send the login link back as the response
      res.send(accountLink.url);
    } catch (err) {
      console.error("Error creating connect account:", err);
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { createConnectAccount };
  