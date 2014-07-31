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

function addHTMLToPage(html) {
    document.body.innerHTML += html;
}

function addTextToPage(txt) {
    var el = document.createElement('p');
    el.appendChild(document.createTextNode(txt))
    document.body.appendChild(el);
}


function getJSON(url) {
    return get(url).then(JSON.parse);
}

function padPath(path) {
    return path = 'json/' + path;
}


var storyPromise;

function getChapter(i) {
    storyPromise = storyPromise || getJSON('json/story.json');

    return storyPromise.then(function(story) {
        return getJSON(padPath(story.chapterUrls[i]))
    })
}



// Sequence
// getJSON('json/story.json').then(function(story) {
//     var sequence = Promise.resolve();
//
//     story.chapterUrls.forEach(function(chapterUrl) {
//         sequence = sequence.then(function() {
//             return getJSON('json/' + chapterUrl)
//         }).then(function(chapter) {
//             addHTMLToPage(chapter.html)
//         })
//     })
// })


// Sequence med array.reduce
// getJSON('json/story.json').then(function(story) {
//
//     // add non-exsistent file to get error
//     story.chapterUrls.push('chapter-6.json');
//
//     addHTMLToPage(story.heading);
//
//     story.chapterUrls.reduce(function(sequence, chapterUrl) {
//         return sequence.then(function() {
//             return getJSON('json/' + chapterUrl)
//         }).then(function(chapter) {
//             addHTMLToPage(chapter.html)
//         }).catch(function(err) {
//             addTextToPage('Argh, broken: ' + err.message);
//             console.log(err);
//         })
//     }, Promise.resolve());
// }).then(function() {
//     addTextToPage('All done');
// }).catch(function(err) {
//     addTextToPage('Argh, broken: ' + err.message);
// }).then(function() {
//     console.log('stop spinner');
// })

// Sequence med array.reduce og promise.all
// getJSON('json/story.json').then(function(story) {
//
//     // add non-exsistent file to get error
//     // story.chapterUrls.push('chapter-6.json');
//
//     addHTMLToPage(story.heading);
//
//     return Promise.all(story.chapterUrls.map(padPath).map(getJSON));
//
// }).then(function(chapters) {
//     chapters.forEach(function(chapter) {
//         addHTMLToPage(chapter.html)
//     });
//     addTextToPage('All done');
// }).catch(function(err) {
//     addTextToPage('Argh, broken: ' + err.message);
// }).then(function() {
//     console.log('stop spinner');
// })



// Sequence med array.reduce og promise.all
getJSON('json/story.json').then(function(story) {

    // add non-exsistent file to get error
    // story.chapterUrls.push('chapter-6.json');

    addHTMLToPage(story.heading);

    return story.chapterUrls.map(padPath).map(getJSON)
        .reduce(function(chain, chapterPromise) {
            return chain.then(function() {
                return chapterPromise;
            }).then(function(chapter) {
                addHTMLToPage(chapter.html)
            })
        }, Promise.resolve());

}).then(function() {
    addTextToPage('All done');
}).catch(function(err) {
    addTextToPage('Argh, broken: ' + err.message);
}).then(function() {
    console.log('stop spinner');
})



// getJSON('json/story.json').then(function(story) {
//     return getJSON('json/' + story.chapterUrls[0])
// }).then(function(chapter1) {
//     addHTMLToPage(chapter1.html)
// }).then(function(chapter1) {
//     console.log(story);
//     return getJSON('json/' + story.chapterUrls[0])
// }).then(function(chapter2) {
//     addHTMLToPage(chapter2.html)
// }).catch(function() {
//     addTextToPage('Failed to show chapter');
// }).then(function() {
//     console.log('stop spinner');
// })


// getChapter(1).then(function(chapter) {
//     console.log(chapter);
//     return getChapter(5);
// }).then(function(chapter) {
//     console.log(chapter)
// }).catch(function(error) {
//     console.log('error', error)
// })







// Json parse

// get('json/story.json').then(JSON.parse).then(function(response) {
//     console.log('json:', response)
// });



// Egen getJson function

// getJSON('json/story.json').then(function(response) {
//     console.log(response);
// })








// function success(response) {
//     console.log('alt ok', response)
// }
//
// function error(error) {
//     console.log('Failed!', error)
// }

// get('file.json').then(success, error)
