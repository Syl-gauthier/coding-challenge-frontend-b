function convert(rawDate, language) {
  var year = rawDate.slice(0,4);
  var month = rawDate.slice(5,7);
  var day = rawDate.slice(8,10);
  var hour = rawDate.slice(11, 13);
  var minute = rawDate.slice(14, 16);
  
  if (language === 'fr') {
    return (day + '/' + month + '/' + year + ' à ' + hour + 'h' + minute);
  } else if (language === 'eng') {
    return (month + '/' + day + '/' + year + ' at ' + hour + ':' + minute);
  } else {
    return (day + '/' + month + '/' + year + '  ' + hour + ':' + minute);
  }
}

module.exports = {convert};