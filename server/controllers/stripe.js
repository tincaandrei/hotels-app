const User = require("../models/user");
const Stripe = require("stripe");

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
      type: "account_onboarding",
    });

    // Merge in additional information if needed (like prefill email) - does not work for some reason
    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email || undefined,
    });
    console.log("ACCOUNT LINK", accountLink);

    // Send the login link back as the response
    res.send(accountLink.url);
  } catch (err) {
    console.error("Error creating connect account:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateDelayDays = async (accountId) => {
  const account = await stripe.account.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });
  return account;
};

const getAccountStatus = async (req, res) => {
  // since we applied the middleware, we have the user
  const user = await User.findById(req.user._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);
  // console.log('USER ACCOUNT RETRIEVED', account)

  const updatedAccount = await updateDelayDays(accountId);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: updatedAccount,
    },
    { new: true }
  )
    .select("-password")
    .exec();
  // console.log(updatedUser)
  res.json(updatedUser);
};

const getAccountBalance = async (req, res) => {
  const user = await User.findById(req.user._id).exec();
  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    // console.log("BALANCE===> ", balance)
    res.json(balance);
  } catch (err) {
    console.log(err);
  }
};

const payoutSetting = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_seller.id,
      {
        redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
      }
      
    );
    console.log('LOGIN LINK FOR PAYOYUT SETTING',loginLink )
    res.json(loginLink)
  } catch (err) {
    console.log("STRIPE ERROR ", err);
  }
};

module.exports = { createConnectAccount, getAccountStatus, getAccountBalance, payoutSetting};
