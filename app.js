var express = require('express');
var compression = require('compression')
var app = express();

process.env.PWD = process.cwd();

app.use(compression());

app.use(express.static(process.env.PWD + '/public'));

app.listen(process.env.PORT || 80);

