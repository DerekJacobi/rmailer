var express = require('express'),
    Mail    = require('../public/models/mail.js');

module.exports = function(app){
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/mail/:id', function(req, res, next) {
    var id = req.params.id;
    Mail.find({to: id}, function (err, mail) {
      if (err) return next(err);
      res.json(mail);
    });
  });

  app.post('/sendemail', function(req, res, next){
    console.log(req.params);
    console.log('sending email');
    Mail.create({from: 'Master Javscript', to: 1, subject: 'Getting better everyday'}, function(err, mail){
      if(err) console.log(err);
      else console.log(mail);
    });
  });

};
