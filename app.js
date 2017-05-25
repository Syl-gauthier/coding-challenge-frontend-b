const express = require('express');
const app = express();

var port = process.env.port || 2000;

app.use(express.static('public'));

app.post('/query', function(req, res) {
  console.log(req);
  res.redirect('/');
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
});
