const express = require('express');
const app = express();
var bodyParser = require('body-parser');


var port = process.env.port || 2000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html' }));

app.post('/query', function(req, res) {
  console.log(req.body);
  res.send(req.body);
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
});
