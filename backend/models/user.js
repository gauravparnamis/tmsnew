var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    email : {type:String, unique:true, require:true},
    username: {type:String, require:true},
    password:{type:String, require:true},
    creation_dt:{type:Date, require:true},
    role: {type:String, default:'User'},
    resetPasswordToken :{type: String},
    requestPasswordExpires :{type:Date},
    random : { type: String},
    resetPasswordToken : {type: Number},
    resetPasswordExpires: { type:Date},
    setPassword: {type:String},


  
});


schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}



module.exports = mongoose.model('User',schema);




