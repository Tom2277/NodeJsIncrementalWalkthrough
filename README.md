# An Extremely simple NodeJS app with Twitter Authentication

First, download the zipfiles for my React Simple Starter Repo :

See Blog post for directions and dependencies for that starter:

---

Did you get all the dependencies installed and the serverless site running?

Great.

Now, lets create the most basic of NodeJS web servers on our machine.

Check out this post by a developer named Adrian Mejia http://adrianmejia.com/blog/2016/08/24/Building-a-Node-js-static-file-server-files-over-HTTP-using-ES6/


Create an index.js file

```touch index.js```

Insert this code of his (it is close to the standard http only convention but he handles the different mime types elegantly!)

(This is not in the master branch of the repo)

```
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.argv[2] || 3000;
http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);
  // parse URL
  const parsedUrl = url.parse(req.url);
  // extract URL path
  let pathname = `.${parsedUrl.pathname}`;
  // maps file extention to MIME types
  const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };
  fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }
    // if is a directory, then look for index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
    }
    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = path.parse(pathname).ext;
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });
}).listen(parseInt(port));
console.log(`Server listening on port ${port}`);

//see
//http://adrianmejia.com/blog/2016/08/24/Building-a-Node-js-static-file-server-files-over-HTTP-using-ES6/

```

With that temporary index.js file in place, ou should be able to boot with ```node index.js``` from your root directory and see your site locally on a web browser  (you will need to go to public/ or public/index.html to see the React site)

Of course, we already could run the entire site without a node server at all. (we did use a static http server that comes free at most hosts)

Also, I haven't tweaked the Webpack configuration to build the JS and CSS files on booting the server so read the last tutorial or run ```npm run build``` to compile changes you make into public file from the src/js/ and src/CSS files where you are doing your work.

## On to Express JS

While the rudimentary http handling above can have it's (limmited) purposes we really want to be able to handle more routes and handle them with correct headers etc, especially if you stay with for future post on integrating your login with another service.


We'll use the popular ExpressJS middle-wear.

```npm i express --save```

Our first dependency.

But now, with the small bit of code below replacing the example above we're in business.

```
var express = require('express')
var app = express()

s
app.use('/' , express.static('public'))

app.get('/', function (req, res) {
  res.render('index',{
    title: 'Home'
  })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
```

This post isn't about the Express server or the important ideas of "middlewear", we are up and running again. The setup I have above routes requests to the root site to index.html in the public folder.  We haven't touched webpack or any view engine aspects.


---

Express will make it far more straightforward to keep this about quick authentication, not about writing requests. There will be enough of that already.

npm install body-parser morgan mongoose --save






MIT license  -  use and enjoy.