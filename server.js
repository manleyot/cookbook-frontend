var express = require('express');
var app = express();

app.use(express.static('.'));

var server = app.listen(3000, function(){
  var port = server.address().port

    console.log('listening at http://localhost:%s', port);
});
