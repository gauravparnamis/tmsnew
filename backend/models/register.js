const mongo = require('mongoose');

const register = mongo.Schema({
    sno:{type:Number},
    fname:{type:String},
    lname:{type:String},
    dob:{type:String},
    email:{type:String},
    Salary:{type:String},
    password:{type: String},
    phone:{type:String},
    gender: {type: String},
    myimage: {type:String},
    path: {type: String}
})

module.exports = mongo.model('register',register);
