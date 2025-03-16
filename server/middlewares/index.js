const { expressjwt: expressJwt} = require('express-jwt');


//req.user
const requireSignIn = expressJwt({
    //secret, exp date
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "user"
})

module.exports = {requireSignIn};