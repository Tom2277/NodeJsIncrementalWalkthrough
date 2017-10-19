// app.use(function(req, res, next){
//       req.secrets = db.collection
//       res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//       return next()
//     })


//     app.get('/form', function(req, res, next){
//         // demo - make a db call and return data to the hb template 
//       let secretdata =
//       res.render('secret-form',{
//         directions: "Fill this out please",
//         layout: 'main',
//         // new line
//         secretdata: secretdata
//         })
//       })