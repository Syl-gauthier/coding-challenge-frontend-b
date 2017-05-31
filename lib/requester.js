var request = require('request');

function formatedQuery(params, callback) {
  departureQuery(params, function(results) {
    var formatedResponse = results.departures.map(function(dep, index) {
      var trip = {};
      trip.key = index;
      trip.departureTime = dep.departure_time;
      trip.arrivalTime = dep.arrival_time;
      trip.price = dep.prices.total;
      
      var depLoc = results.locations.find(function(loc) {
        return loc.id === dep.origin_location_id;
      });
      var arrLoc = results.locations.find(function(loc) {
        return loc.id === dep.destination_location_id;
      });
      
      trip.departureLoc=depLoc.name;
      trip.arrivalLoc=arrLoc.name;
      return trip;
    });
    
    callback(formatedResponse);
  })
}

function departureQuery(params, callback) {
  console.log(params);
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
      next(params, result, callback);
    } else {
      callback(result);
    }
  });
}

function next(params, result, callback) {
  
  if(!result.departures) result.departures = [];
  if(!result.operators) result.operators = [];
  
  if (!params.options) params.options = {};
  params.options.index = result.departures.length;
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
    if (response.statusCode == 200) {
      console.log(result.complete);
      console.log('departure', result.departures.length);
      var body = JSON.parse(body);
      result.departures = result.departures.concat(body.departures);
      result.operators = result.operators.concat(body.operators);
      if (!result.complete) {
        next(params, result, callback);
      } else {
        callback(result);
      }
    } else {
      setTimeout(function() {next(params, result, callback)}.bind(this), 5000);
    }
    
  });
}

module.exports={departureQuery, formatedQuery};