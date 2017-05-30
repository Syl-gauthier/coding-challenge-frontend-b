var request = require('request');



function departureQuery(params, callback) {
  var url ='https://napi.busbud.com/x-departures/';
  url += params.origin + '/';
  url += params.destination + '/';
  url += params.date
  if (params.options) {
    var querystring = '?';
    for (i in params.option) {
      querystring += i + '=' + params.option[i];
    }
  }
  
  var option = {
    url,
    headers: {
      Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'x-busbud-token' : process.env.BUDBUS_TOKEN
    }
  }
  var result = {};
  request(option, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred 
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    result = JSON.parse(body);
    if (!result.complete) {
      next(params, 0, result, callback);
    } else {
      callback(result);
    }
  });
}

function next(params, index, result, callback) {
  if (!params.options) param.options = {};
  params.options.index = index;
  var url ='https://napi.busbud.com/x-departures/';
  url += params.origin + '/';
  url += params.destination + '/';
  url += params.date + '/poll';
  if (params.options) {
    var querystring = '?';
    for (i in params.option) {
      querystring += i + '=' + params.option[i];
    }
  }
  
  var option = {
    url,
    headers: {
      Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'x-busbud-token' : process.env.BUDBUS_TOKEN
    }
  }
  request(option, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred 
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    var body = JSON.parse(body);
    result.departures.append(body.departures);
    result.operators.append(body.operators);
    console.log(result.departures);
    if (!result.complete || index>10) {
      index++;
      next(params, index, result, callback);
    } else {
      callback(result);
    }
  });
}

module.exports={departureQuery};