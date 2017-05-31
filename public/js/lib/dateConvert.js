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

function tomorrow() {
  var date= new Date();
  date.setDate(date.getDate() +1);
    
  var year = date.getFullYear();
  var month = (date.getMonth() +1) + '';
  var day = date.getDate() + ''; 
    
  if (month.length === 1) month = '0'+month; 
  if (day.length === 1) day = '0'+day; 
  
  return (year+'-'+month+'-'+day);
}

module.exports = {convert, tomorrow};