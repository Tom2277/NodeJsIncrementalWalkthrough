const Sillysecret = require('../models/sillysecret');
const mongodb = require('mongodb') //todo: see if this is needed to access ObjectId conversion


exports.getSecrets = function (req, res, next) {
  Sillysecret.find(function (err, result) {
      if (err) {
        console.log('in error of get route for sillysecrets get')
          res.send(err);
      }
      console.log( "in get of the sillysecrets exports")
      res.render('secret-form',{
        directions: "Notorious Info",
        layout: 'main',
        secretdata: result
      })
  });
}

exports.createSecret = function (req, res, next) {
  console.log("in add sillysecrets exports");
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
  Sillysecret.create(newSecret, function(err, result){
    if (err) return next(err)

    res.redirect('/sillysecrets');
  })

}

exports.deleteSecret = function(req, res, next){
  console.log('in delete sillysecrets exports')
  req.checkParams('id', 'Check Invalid name in DeleteID').notEmpty()
  let errors = req.validationErrors()
  if (errors) return next(errors)
  // important 'Gotcha'!! mongoDB does not see a string as an id .. it must be converted to a mongo id object !!!!
  var secretId = mongodb.ObjectId(req.params.id)
  Sillysecret.remove({ "_id" : secretId }, function (err, result) {     
    if (err) { console.log("the error is : ", error); return next(err)}
    console.log(result.result)
    res.redirect('/sillysecrets');
  })
}