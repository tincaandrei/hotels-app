const User = require('../models/user');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
  console.log("Request Body:", req.body);
  const { name, email, password } = req.body;
  //validation

  if (!name) {
    return res.status(400).send("name is reqired");
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .send("password is required and should be at least 6 characters long")
  }
  let userExist = await User.findOne({email}).exec();
  if(userExist){
    return res.status(400).send("Email is already taken");
  }

  //register
  const user = new User(req.body);
  try{
    await user.save();
    console.log('USER CREATED', user)
    return res.json({ok: true});
  }catch(err){
    console.log('CREATE USER FAILED', err);
    return res.status(400).send("error, please try again");
  }
};

const login = async (req, res) => {
  const {email, password} =  req.body;
  try {
    // checking if user exists in the database by email
    let user = await User.findOne({email}).exec();
    if(!user) return res.status(400).send('User with that email not found!');
    // comparing passwords
    user.comparePassword(password, (err, match) =>{
      console.log('COMPARE PASSOWRD IN LOGIN ERR', err);
      if(!match || err) return res.status(400).send("Wrong password");
      //console.log('GENERATE A TOKEN AND SEND AS A RESPONSE TO CLIENT');
      let token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,{
        expiresIn: '1d'
      })
      res.json({token, user:{
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        stripe_account_id: user.stripe_account_id,
        stripe_seller: user.stripe_seller,
        stripeSession: user.stripeSession,
    }});
    }) 
  } catch (error) {
    console.log('LOGIN ERROR', error);
    res.status(400).send('Signin failed');
  }
}


module.exports = { register, login };
