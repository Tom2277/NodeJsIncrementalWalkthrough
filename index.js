const express       = require('express')
const mongoose      = require('mongoose');
const mongoURL      = 'mongodb://localhost:27017/quickstartauth'
const bodyParser    = require('body-parser');
const methodOverride = require('method-override');
const validator     = require('express-validator');
const exphbs        = require('express-handlebars');
// const passport      = require('passport');

const sillysecrets  = require('./routes/sillysecrets');
const users         = require('./routes/users');

const app           = express();


    var mongoDB = process.env.MONGODB_URI || mongoURL;
    mongoose.connect(mongoDB);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function(){ console.log('hi dee ho, MongoDB is connected')})

    // require('./config/passport')(passport); // pass passport for configuration

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
   
    
    app.use('/sillysecrets', sillysecrets);
    app.use('/users', users);

    app.use('/' , express.static('public'))
  
    app.get('/', function (req, res) {
      res.render('index',{})
    })

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
      res.render('error');
    });

  
    app.listen(3000, function () {
      console.log('QuickStartAuth app listening on port 3000!')
    })

module.exports = app;