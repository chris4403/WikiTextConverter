var fs = require('fs');
var vm = require('vm');
var assert = require('assert');


var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code,path);
}.bind(this);
includeInThisContext("../wikitextconverter.js");


console.log("=== start test ===");
console.log("=== typeof ===");
assert.equal( typeof WikiTextConverter, "object" );
assert.equal( typeof WikiTextConverter.hatenak2textile, "function" );
assert.equal( typeof WikiTextConverter.hatenak2markdown, "function" );
assert.equal( typeof WikiTextConverter.textile2hatenak, "function" );
assert.equal( typeof WikiTextConverter.markdown2hatenak, "function" );

console.log("=== hatenak2textile ===");
var textHatenaExpected = fs.readFileSync('./assets/text-hatena.txt','utf-8');
var textTexileExpected = fs.readFileSync('./assets/text-textile.txt','utf-8');

var textTexileActual = WikiTextConverter.hatenak2textile(textHatenaExpected);

//assert.equal( textTexileActual , textTexileExpected );

console.log("=== hatenak2markdown ===");
assert.equal( WikiTextConverter.hatenak2markdown('*headline') , '#headline' );
assert.equal( WikiTextConverter.hatenak2markdown('**headline') , '##headline' );
assert.equal( WikiTextConverter.hatenak2markdown('***headline') , '###headline' );
assert.equal( WikiTextConverter.hatenak2markdown('****headline') , '####headline' );
assert.equal( WikiTextConverter.hatenak2markdown('-list') , '-list' );
assert.equal( WikiTextConverter.hatenak2markdown('--list') , '    -list' );
assert.equal( WikiTextConverter.hatenak2markdown('---list') , '        -list' );
