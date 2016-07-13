var express = require('express'),
    Mail    = require('../public/models/mail.js');

module.exports = function(app){
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
    var emailTo = req.body.to,
        emailFrom = req.body.from,
        emailSubject = req.body.subject,
        emailMessage = req.body.message;
    Mail.create({from: emailFrom, to: emailTo, subject: emailSubject, message: emailMessage}, function(err, mail){
      if(err) console.log(err);
      else console.log(mail);
    });
  });

};
