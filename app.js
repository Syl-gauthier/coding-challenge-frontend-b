require('dotenv').config();

const express = require('express');
const app = express();
var bodyParser = require('body-parser');

var requester = require('./lib/requester.js');

var port = process.env.PORT || 2000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html' }));

app.post('/query', function(req, res) {
  console.log(req.body);
  requester.formatedQuery({
    origin: req.body.start, 
    destination: req.body.arrival, 
    date: req.body.date
  }, function(result) {
    res.send(JSON.stringify(result));
  });
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
});
