const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {Schema} = mongoose



const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required : "Name is required",
    },
    email: {
        type: String,
        trim: true,
        required: "Email is required",
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64,
    },
    stripe_account_id: {
        type: String,  
    },
    stripe_seller: {
        type: Object,  
    },
    stripeSession: {
        type: Object, 
    }
}, {timestamps: true})



// writing a method so that we can use "pre" middlewhere, that only triggers for hashing the password in the event of creating the password or updating the password

userSchema.pre('save', function (next) {
    let user = this;
    if(user.isModified('password')){
        return bcrypt.hash(user.password, 12, function (err, hash){
            if(err){
                console.log("bcrypt error ", err);
                return next(err);
            }
            user.password = hash;
            return next();
        })
    }else{
        return next();

    }
})

userSchema.methods.comparePassword = function (password, next){
    bcrypt.compare(password, this.password, function(err, match){
        if(err){
            console.log("compare password error");
            return next(err, false);
        }
        // if there is no error we get null
        console.log("MATCH PASSWORD: ", match);
        return next(null, match); // true
    })
}
module.exports = mongoose.model('User', userSchema);