var Promise = require('es6-promise').Promise;
var get = require('./get.js');

function success(response) {
    console.log('alt ok', response)
}

function error(error) {
    console.log('Failed!', error)
}


get('story.json').then(success, error);


// get('file.json').then(success, error)
