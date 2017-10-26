const express       = require('express')
const mongoose      = require('mongoose');
const config        = require('./config/config.js')
const mongoURL      = config.database
const port          = config.port
const bodyParser    = require('body-parser');
const methodOverride = require('method-override');
const validator     = require('express-validator');
const exphbs        = require('express-handlebars');

const routes         = require('./routes/router');

const app           = express();

    app.disable('x-powered-by') // simple thing we should do - even if assuming express might be common
    // we will try and use and include the 'helmet' module before any deployment as low hanging fruit first step security.

    var mongoDB = process.env.MONGODB_URI || mongoURL;
    mongoose.connect(mongoDB, { useMongoClient: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function(){ console.log('hi dee ho, MongoDB is connected')})

    // express middleware for all routes
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    }));
    app.use(validator());
    
    app.engine('.hbs', exphbs({extname: '.hbs'}));
    app.set('view engine', '.hbs');
   
    app.use('/' , express.static('public'))
  
    app.get('/', function (req, res) {
      res.render('index',{})
    })

    // apply routes from router.js
    app.use('/', routes)

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found Here');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error'); // renders our hbs error view
    });

  
    app.listen( port , function () {
      console.log('QuickStartAuth app listening on port 3000!')
    })

module.exports = app;