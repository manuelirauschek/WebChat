// callback = function(response) {}
function postRequest(url, values,  callback) {
    req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            callback(req.response);
        }
    }
    req.send(values);
}