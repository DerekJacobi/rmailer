var express     = require('express'),
    ejs         = require('ejs'),
    path        = require('path'),
    http        = require('http'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    nodemailer = require('nodemailer'),
    app         = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var port = process.env.PORT || 3000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));


require('./app/app.js')(app);

var uristring =
   process.env.MONGOLAB_URI ||
   process.env.MONGOHQ_URL ||
   'mongodb://localhost/';

mongoose.connect(uristring, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        app.listen(port);
        console.log("Rebel Mail mailer up on " + port);
        console.log('connection successful');
    }
});
