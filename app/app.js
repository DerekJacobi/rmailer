var express     = require('express'),
    nodemailer  = require('nodemailer'),
    Mail        = require('../public/models/mail.js');

module.exports = function(app){

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://rebelmailtestact@gmail.com:rebelmailtest@smtp.gmail.com');

  //render hompage
  app.get('/', function (req, res) {
    res.render('index');
  });

  //get all mail for a selected user
  app.get('/mail/:id', function(req, res, next) {
    var id = req.params.id;
    Mail.find({to: id}, function (err, mail) {
      if (err) return next(err);
      res.json(mail);
    });
  });

  //send email to a selected user
  app.post('/sendemail', function(req, res, next){

    //Send email to mongodb database using http
    var emailTo = req.body.to,
        emailFrom = req.body.from,
        emailSubject = req.body.subject,
        emailMessage = req.body.message;
    Mail.create({from: emailFrom, to: emailTo, subject: emailSubject, message: emailMessage}, function(err, mail){
      if(err) console.log(err);
      else console.log(mail);
    });


  // create email template
    var rebelMailEmail = transporter.templateSender({
        subject: '{{subject}}!',
        text: 'Hello, {{to}}, {{ message }}',
        html: '<div><div><img src="https://s31.postimg.org/a247w8ijf/Screen_Shot_2016_07_13_at_12_05_56_AM.png"></div><div style="margin"><h4>To : {{ to }}</h4><h4>From : {{ from }}</h4><h6>Subject : {{ subject }}</h6><h6>Message : {{ message }}</h6></div>    <div><img src="https://s32.postimg.org/dk4tn3gw5/Screen_Shot_2016_07_13_at_12_06_06_AM.png"></div></div>'
        }, {
        from: 'derek@example.com',
    });

    // send html/text email
    rebelMailEmail({
      to: emailTo
        }, {
        to : emailTo,
        subject: emailSubject,
        message: emailMessage,
        from:    emailFrom
        }, function(err, info){
          if(err){
           console.log('err');
          }else{
            console.log('Email sent');
          }
    });

  });

};
