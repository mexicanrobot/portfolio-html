var express = require("express");
var app = express();

app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/js'));
app.use('/images',express.static(__dirname + 'public/images'));

var port = process.env.PORT || 8081

var server = app.listen(port, function() {
    console.log("Server started at http://localhost:%s",port);
});