'use strict';

let get = require('./get');
let async = require('./async');

function addHTMLToPage(html) {
    document.body.innerHTML += html;
}

function addTextToPage(txt) {
    let el = document.createElement('p');
    el.appendChild(document.createTextNode(txt))
    document.body.appendChild(el);
}


function getJSON(url) {
    return get(url).then(JSON.parse);
}

function padPath(path) {
    return path = 'json/' + path;
}


async(function *() {
    try {
        let story = yield getJSON('json/story.json');
        addHTMLToPage(story.heading);

        let chapterPromises = story.chapterUrls.map(padPath).map(getJSON);

        for (let i = 0, chapterPromise; chapterPromise = chapterPromises[i]; i++) {
            let chapter = yield chapterPromise;
            addHTMLToPage(chapter.html);
        }

        addTextToPage('All done!');

    }

    catch (err) {
        addTextToPage('Argh, broken: ' + err.message);
    }

    console.log('stop spinner');

})


// getJSON('json/story.json').then(function(story) {
//
//     // add non-exsistent file to get error
//     // story.chapterUrls.push('chapter-6.json');
//
//     addHTMLToPage(story.heading);
//
//     return story.chapterUrls.map(padPath).map(getJSON)
//         .reduce(function(chain, chapterPromise) {
//             return chain.then(function() {
//                 return chapterPromise;
//             }).then(function(chapter) {
//                 addHTMLToPage(chapter.html)
//             })
//         }, Promise.resolve());
//
// }).then(function() {
//     addTextToPage('All done');
// }).catch(function(err) {
//     addTextToPage('Argh, broken: ' + err.message);
// }).then(function() {
//     console.log('stop spinner');
// })
