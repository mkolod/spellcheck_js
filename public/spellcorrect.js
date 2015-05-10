var alphabet = _.range(0, 26).map(function(x) { return String.fromCharCode(x + 97); });
$.ajaxSetup({ async: false }); // get the training data in sync fashion
var trainingData = $.get('big.txt').responseText.toLowerCase().match(/[a-z]+/g);

var nWords = _.chain(trainingData).countBy().value();
function known(words, fun) {
  var transformed = fun(words)
  var wrds = transformed instanceof Array ? transformed : [transformed];
  var recognized =  _.filter(wrds, function(x) { return nWords.hasOwnProperty(x) } );
  return (recognized.length < 1) ? [] :  [_.sortBy(_.zip(_.map(recognized, function(x) { return nWords[x] }), recognized), function(x) { return -x[0]; })[0][1]];
}

function edits1(word) {
  var lower = word.toLowerCase()
  var splits = _.map(_.range(0, lower.length + 1), function(idx) { return [ lower.slice(0, idx), lower.slice(idx, lower.length)]; });
  var deletes = _.map(splits, function(x) { return x[0] + x[1].slice(1, x[1].length) });
  var inserts = _.flatten(_.map(splits, function(x) { return _.map(alphabet, function(y) { return x[0] + y + x[1]; }) }));
  var transposes = _.map(splits, function(x) { 
  	return x[0].slice(0, x[0].length - 1) + x[1].slice(0, 1) + x[0].slice(x[0].length-1, x[0].length) + x[1].slice(1, x[1].length) 
  });
  var replaces = _.flatten(_.map(splits, function(x) { return _.map(alphabet, function(y) { return x[0] + y + x[1].slice(1, x[1].length); }) }));
  return deletes.concat(inserts).concat(transposes).concat(replaces);
}

function edits2(word) { return _.flatten(_.map(edits1(word), function(x) { return edits1(x); })) }

function correct(word) {
  var startTime = Date.now();
  var recognized = _.find([_.identity, edits1, edits2], function(x) { return !_.isEmpty(_.partial(known, word)(x)) });
  console.log('Spelling correction took ' + (Date.now() - startTime) + " ms")
  return (recognized === undefined ? [word] : known(word, recognized))[0];
}