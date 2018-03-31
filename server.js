var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/src'));

app.get('/', function(req, res){
    res.send('Hello World. add /index to move on');
});
app.get('/index', function(req, res){
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(8080, function() {
    console.log('Server started at port 8080')
})