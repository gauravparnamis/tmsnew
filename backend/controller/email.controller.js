const nodemailer = require('nodemailer')
const request = require("request")


exports.sendEmail = function(req,res,next,toEmail, subject, templateFile){
    var options = {
        uri: `http://localhost:3000/Email-Template/mail/${templateFile}`,
        method: 'POST',
        json: { name: "Jon Snow" } // All the information that needs to be sent
    };  
    request(options, function (error, response, body) {
        if (error) console.log(error)
        var transporter = nodemailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            secure: true,
            auth: {
                user: mailConfig.account,
                pass: mailConfig.password 
            }
        })
        var mailOptions = {
            from: mailConfig.account,
            to: toEmail,
            subject: subject,
            html: body
        }       
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) console.log(error)
        })
    })  
}