var express = require('express');
var router = express.Router();
var User = require('../models/user');
const register = require('../models/register');
var task = require('../models/task');
var jwt = require('jsonwebtoken');                    
var nodemailer = require('nodemailer');
var transporter = require('nodemailer-smtp-transport');  
var handlebars = require('handlebars');
var crypto = require("crypto");
var async = require("async");
var fs = require('fs');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

exports.register = function(req,res,next){
  console.log(req.body);
    var user = new User({
    email: req.body.email.toLowerCase(),
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
    });
    user.save();
    
    //send register mail 
    var readHTMLFile = function(path, callback) {
      fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
          if (err) {
              throw err;
              callback(err);
          }
          else {
              callback(null, html);
          }
      });
    };
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'supportntest@gmail.com',
          pass: 'vivatest@321'
      }
    });
    
    readHTMLFile(__dirname + '/MailTemplate/mail.html', function(err, html) {
      var template = handlebars.compile(html);
      var replacements = {
           username: req.body.username
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
          from: 'supportntest@gmail.com',
          to : req.body.email,
          subject : 'test',
          html : htmlToSend 
       };
       transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
              console.log(error);
              callback(error);
          }
          console.log('mail send');
      });
    });
    
    res.status(200).json({
      response:false,  
      message:"Email successfully",
      // users:data
    })
    
  }



    exports.check = function(req,res,next){

        var name = req.body.username;
        console.log(name);
        User.findOne({email:name})
        .exec()
        .then(data=>{
            if(!data)
            return res.status(400).json({
              response:false,
              message:"Your Email not Exist",
              data:data,
              message:'your Email not in Database.'
            })
            
            else{
              return res.status(200).json({
                response:true,
                message:"your Email is Registered",
                data:data,
                message:'your Email is exists in Database.'
      
              })
      
            }
        })
        console.log('username Exists.')
      }



exports.login =  function(req,res,next){
  
    let promise = User.findOne({email:req.body.email.toLowerCase()}).exec();
    
      promise.then(function(doc){             
       if(doc) {
        console.log(doc);
         if(doc.isValid(req.body.password)){
          
           let token = jwt.sign({username:doc.username},'secret', {expiresIn : '1h'});
          return res.status(200).json({token:token,doc:doc})
    
         } else {
           return res.status(501).json({message:' Invalid Credentials'});
         }
       }
       else {
         return res.status(501).json({message:'User email is not registered.'})
       }
      });
      promise.catch(function(err){
          return res.status(501).json({message:'Some internal error'});
        })
     };



    
     exports.username =( verifyToken, function(req,res,next){
        return res.status(200).json(decodedToken.username);
      })
      
      var decodedToken='';
      function verifyToken(req,res,next){
        let token = req.query.token;
        jwt.verify(token,'secret', function(err, tokendata){
          if(err){
            return res.status(400).json({message:' Unauthorized request'});
          }
          if(tokendata){
            decodedToken = tokendata;
            next();
          }
        })
      }



      exports.forgot = function(req, res,next) {

        let email  = req.body.Email;
      
        User.findOne({email:email})
        .exec()
        .then(data=>{
            if(!data)
            return res.send("You are not registered");
      
            else{
            let random =  Math.floor(100000000 + Math.random() * 900000000);
            User.resetPasswordToken = random;
            console.log(User.resetPasswordToken)
            var smtpTransport = nodemailer.createTransport({
              service: 'gmail',
                auth: {
                    user: 'supportntest@gmail.com',
                    pass: 'vivatest@321'
                }
            });
            var mailOptions = {
              to:email,
              from: 'supportntest@gmail.com',
              subject: 'Reset Password Link', 
              text:'Here is the link for your password',      
              html:`{href='http://localhost:4200/main/reset/${data._id}/${random}'}`
            };
            smtpTransport.sendMail(mailOptions, function(err) {
              if(err){
                console.log(err)
              res.send(err);       
              }
              else{
                User.updateOne({_id:data._id},{random:random}).exec();
                res.send("mail sent");   
              }         
            });    
      
         }
        })
        
        .catch(err=>{
          next(err);
        })
      };
      
      
      exports.reset = function(req, res,next) {
        console.log(req.body.id);
        const id= req.body.id;
        const password =  User.hashPassword(req.body.formdata.password); 
       User.findOne({ _id:id }).exec()
       .then(function (user) { 
           if(!user){
               return res.status(200).json('You are unauthorize.')
           } User.updateOne({_id:id},{
                       password: password
                   }).exec()
                   .then(data=>{
                    return res.status(200).json({
                      'status': true,
                      'message': 'Success',
                      'result': data
      
                      })
                   }).catch(err=>{
                     next(err);
                   });
                  })
          };
      


          exports.createuser = function(req,res,next)
          {  
              var data = JSON.parse(req.body.data);
              if(req.file){
                console.log(req.file);
                data.myimage = req.file.filename;
              }
              register.find({Email: data.email})
              .then(users=>{
                  if(users.length > 0)        
                      return res.status(200).json({
                          response:false,
                          message:"User already exist"
                      })  
                      
                      data = register(data);
                     
                      data.save()            
                      .then(result=>{
                          return res.status(200).json({
                              response:true,
                              message:"Your document has been inserted",
                              data:data
          
                          })
                      }).catch(err=>{
                          return res.status(500).json({
                              response:false,
                              message:err
                          })
                      })
              })   
          
          };



          exports.getuserlist =  function(req,res,next)
          { 
            register.find()
              .exec()
              .then( function(data){
                 return res.status(200).json({
                      response:true,          
                      users:data
                  })
              })
          }
          


          exports.deleteUser = function(req,res,next)
          {
            register.deleteOne({_id:req.query.id})
              .exec()
              .then( function(data){
                  if(data.n > 0)
                 return res.status(200).json({
                      response:true,  
                      message:"user deleted.",   
                      users:data
                  })
          
                  else
                  return res.status(200).json({
                      response:false,  
                      message:"user can't deleted.",
                      users:data
                  })
              })
          
              const id = req.query.id;
              register.findOne({_id: id})
              .then(users=>{
                  console.log(users.fname);
              const userName = users.fname+' '+lname;
              const userEmail = users.email;
          })
          }



          exports.edit = function(req,res,next){
            register.findOne({_id:req.query.id})
            .exec()
            .then( function(data){
               return res.status(200).json({
                    response:true,          
                    users:data
                })
            })
          }
          


          exports.edituser = function(req,res,next){
             var data = JSON.parse(req.body.data);
             if(req.file){
                console.log(req.file);
                data.myimage = req.file.filename;
             }
            console.log(data);
            register.findByIdAndUpdate(data._id,data)
            .exec()
            .then(function(data){
                return res.status(200).json({
                    response:true,
                    message: "User is update Successfully"
                })
            }).catch((err)=>{
              console.log(err);
              next(err)
            })
          }
          
         
          
          exports.CreateTask =  function(req,res,next)
          {  
              console.log(req.body)
              
              req.body.taskname = req.body.taskname.toLowerCase();
              task.find({Email: req.body.taskname})
              .then(tasks=>{
                  if(tasks.length > 0)        
                      return res.status(200).json({
                          response:false,
                          message:"Task already exist"
                      })
                          
                      
                      var data = new task(req.body);
                      console.log(data);
                      

                      
                          
                     
                      data.save()            
                      .then(result=>{
                          return res.status(200).json({
                              response:true,
                              message:"Your Task has been inserted",
                              data:data
          
                          })
                      }).catch(err=>{
                          return res.status(500).json({
                              response:false,
                              message:err
                          })
                      })
                      
                      console.log('data save')
              })   
          
          }
          
          exports.gettask = function(req,res,next)
          { 
            
            task.find().populate({path:'assignemp', model:'register', select: 'fname'})
            .exec()
              .then( function(data){
                 return res.status(200).json({  
                      response:true,             
                      users:data                 
                      
                  })
              })
          }


          exports.deletetask =  function(req,res,next) 
          {
            task.deleteOne({_id:req.query.id})
              .exec()
              .then( function(data){
                  if(data.n > 0)
                 return res.status(200).json({
                      response:true,  
                      message:"user deleted.",   
                      users:data
                  })
          
                  else
                  return res.status(200).json({
                      response:false,  
                      message:"user can't deleted.",
                      users:data
                  })
              })
          
              const id = req.query.id;
              register.findOne({_id: id})
              .then(task=>{
                  console.log(task.taskname);
              const taskname = task.taskname+' '+desc;
          })
          }

          exports.showedittask = function(req,res,next){
           task.findOne({_id:req.query.id})
            .exec()
            .then( function(data){
               return res.status(200).json({
                    response:true,          
                    task:data
                })
            })
          }


          exports.edittask = function(req,res,next){
            var data = req.body;
            console.log(data);
            task.findByIdAndUpdate(data._id,data)
            .exec()
            .then(function(data){
                return res.status(200).json({
                    response:true,
                    message: "User is update Successfully"
                })
            }).catch((err)=>{
              console.log(err);
              next(err)
            })
          }

          exports.getadmin = function(req,res,next){          
            console.log('in API')            
            User.find()  
            .exec()   
            .then( function(data){   
               return res.status(200).json({  
                    response:true,            
                    users:data   
                })  
            })   
          } 



          exports.setrole = function(req,res,next){  
              console.log('In Set Role API', req.query.id);
              var id = req.query.id;
              User.findByIdAndUpdate({_id:id}, {role: 'admin'})
              .then( function(data){
               
                  return res.status(200).json({
                  response:true,
                  })
                })          
            }                                                                                              
          

      
      
      
      
              
            
        

