function postRequest(target, data, callback) {
  var r = new XMLHttpRequest();
  r.open("POST", target, true);
  r.setRequestHeader("Content-Type", "application/json");
  r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return;
    console.log('post request sucessful');
    callback(r.responseText);
  };
  r.send(JSON.stringify(data));
}

export default postRequest;
