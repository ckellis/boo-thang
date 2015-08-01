var express = require('express');
var app = express();

process.env.PWD = process.cwd()

app.use(express.compress());

app.use(express.static(process.env.PWD + '/public'));

app.listen(process.env.PORT || 80);

