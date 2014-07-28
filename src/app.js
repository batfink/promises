var Promise = require('es6-promise').Promise;
// var get = require('./get.js');

function get(url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        }

        req.onerror = function() {
            reject(Error('Network error'))
        }

        req.send();
    })
}

function success(response) {
    console.log('alt ok', response)
}

function error(error) {
    console.log('Failed!', error)
}


get('story.json').then(success, error);


// get('file.json').then(success, error)
