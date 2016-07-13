var express     = require('express'),
    ejs         = require('ejs'),
    path        = require('path'),
    http        = require('http');
    mongoose    = require('mongoose');

var app = express();

var port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));


require('./app/app.js')(app);


mongoose.connect('mongodb://localhost/', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        app.listen(port);
        console.log("Rebel Mail mailer up on " + port);
        console.log('connection successful');
    }
});
