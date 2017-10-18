var express = require('express')
var exphbs  = require('express-handlebars');

var app = express();

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


app.get('/form', function(req, res, next){
  res.render('secret-form',{
    directions: "Fill this out please",
    layout: 'main'
    })
  })

app.use('/' , express.static('public'))

app.get('/', function (req, res) {
  res.render('index',{
    title: 'Home'
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})