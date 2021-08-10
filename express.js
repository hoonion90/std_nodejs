var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();

app.use(express.static('.'));
app.get('/', function (request, response) {
    var _url = request.url;
    var title = request.query.id;
    if(_url == '/'){
        title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }

    response.writeHead(200);
    fs.readFile(`data/${title}`, 'utf8', function(err, description){
      var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      response.end(template);
    })
});

app.listen(3000);