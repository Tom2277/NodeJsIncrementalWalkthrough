const express       = require('express')
const app           = express();
const mongodb       = require('mongodb')
const mongoURL      = 'mongodb://localhost:27017/quickstartauth' //note I named the collection 'quickstartauth'
const bodyParser    = require('body-parser');
const methodOverride = require('method-override');
const validator     = require('express-validator');

const exphbs        = require('express-handlebars');

// // we are now making all serving and routing contingent on the mongoDB connection
mongodb.MongoClient.connect(mongoURL, function(err, db) {
  if (err) {
    console.error("Mongo could not connect. Perhaps you haven't started it locally ?", err)
    process.exit(1)
  }   


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
   
    //here is one way of getting some CRUD routes implemented right in our main file - we will refactor this.
    app.use(function(req, res, next){
      req.secrets = db.collection('sillysecrets')
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
      return next()
    })
    app.get('/form', function(req, res, next){
      req.secrets.find().toArray(function(err, results){
        if (err) { console.log(err, "error" )} 
        res.render('secret-form',{
          directions: "Notorious Info",
          layout: 'main',
          secretdata: results
        })
      })
    })
    app.post('/form', function(req, res, next){
      req.checkBody('name', "name required").notEmpty()
      req.checkBody('details', "name required").notEmpty()
      req.sanitize('name').escape()
      req.sanitize('details').escape()
      req.sanitize('name').trim()
      req.sanitize('details').trim()
      let errors = req.validationErrors()
      if (errors){ console.log("will not validate... not saving"); return }

      let newSecret = { "name": req.body.name, "details": req.body.details}
      console.log("here is the newSecret", newSecret)
      req.secrets.insert(newSecret, function(err, result){
        if (err) return next(err)

        res.redirect('/form');
      })

    })
    app.delete('/form/:id', function(req, res, next){
      req.checkParams('id', 'Check Invalid name in DeleteID').notEmpty()
      let errors = req.validationErrors()
      if (errors) return next(errors)
      // important 'Gotcha'!! mongoDB does not see a string as an id .. it must be converted to a mongo id object !!!!
      var secretId = mongodb.ObjectId(req.params.id)
      req.secrets.remove({ "_id" : secretId }, function (err, result) {     
        if (err) { console.log("the error is : ", error); return next(err)}
        console.log(result.result)
        res.redirect('/form');
      })
    })
     
    app.use('/' , express.static('public'))
  
    app.get('/', function (req, res) {
      res.render('index',{})
    })
  
    app.listen(3000, function () {
      console.log('QuickStartAuth app listening on port 3000!')
    })
})