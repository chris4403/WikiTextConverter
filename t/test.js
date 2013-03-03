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
assert.equal( WikiTextConverter.hatenak2textile('*headline') , 'h1. headline\n' );
assert.equal( WikiTextConverter.hatenak2textile('**headline') , 'h2. headline\n' );
assert.equal( WikiTextConverter.hatenak2textile('***headline') , 'h3. headline\n' );
assert.equal( WikiTextConverter.hatenak2textile('****headline') , 'h4. headline\n' );
assert.equal( WikiTextConverter.hatenak2textile('-list') , '*list' );
assert.equal( WikiTextConverter.hatenak2textile('--list') , '**list' );
assert.equal( WikiTextConverter.hatenak2textile('---list') , '***list' );
assert.equal( WikiTextConverter.hatenak2textile('+list') , '#list' );
assert.equal( WikiTextConverter.hatenak2textile('++list') , '##list' );
assert.equal( WikiTextConverter.hatenak2textile('+++list') , '###list' );
assert.equal( WikiTextConverter.hatenak2textile('abc[http://example.com/hoge:title=link name]def')
                                                    , 'abc"link name":http://example.com/hoge def' );

var textHatenaExpected = fs.readFileSync('./assets/text-hatena.txt','utf-8');
var textTexileExpected = fs.readFileSync('./assets/text-textile.txt','utf-8');

var textTexileActual = WikiTextConverter.hatenak2textile(textHatenaExpected);

//assert.equal( textTexileActual , textTexileExpected );
console.log("=== textile2hatenak");
assert.equal( WikiTextConverter.textile2hatenak('h1. headline\n') , '*headline' );
assert.equal( WikiTextConverter.textile2hatenak('h2. headline\n') , '**headline' );
assert.equal( WikiTextConverter.textile2hatenak('h3. headline\n') , '***headline' );
assert.equal( WikiTextConverter.textile2hatenak('h4. headline\n') , '****headline' );
assert.equal( WikiTextConverter.textile2hatenak('*list') , '-list' );
assert.equal( WikiTextConverter.textile2hatenak('**list') , '--list' );
assert.equal( WikiTextConverter.textile2hatenak('***list') , '---list' );
assert.equal( WikiTextConverter.textile2hatenak('#list') , '+list' );
assert.equal( WikiTextConverter.textile2hatenak('##list') , '++list' );
assert.equal( WikiTextConverter.textile2hatenak('###list') , '+++list' );

console.log("=== hatenak2markdown ===");
assert.equal( WikiTextConverter.hatenak2markdown('*headline') , '#headline' );
assert.equal( WikiTextConverter.hatenak2markdown('**headline') , '##headline' );
assert.equal( WikiTextConverter.hatenak2markdown('***headline') , '###headline' );
assert.equal( WikiTextConverter.hatenak2markdown('****headline') , '####headline' );
assert.equal( WikiTextConverter.hatenak2markdown('-list') , '-list' );
assert.equal( WikiTextConverter.hatenak2markdown('--list') , '    -list' );
assert.equal( WikiTextConverter.hatenak2markdown('---list') , '        -list' );
assert.equal( WikiTextConverter.hatenak2markdown('+list') , '1.list' );
assert.equal( WikiTextConverter.hatenak2markdown('++list') , '    1.list' );
assert.equal( WikiTextConverter.hatenak2markdown('+++list') , '        1.list' );

console.log("=== markdown2hatenak ===");
assert.equal( WikiTextConverter.markdown2hatenak('#headline') , '*headline' );
assert.equal( WikiTextConverter.markdown2hatenak('##headline') , '**headline' );
assert.equal( WikiTextConverter.markdown2hatenak('###headline') , '***headline' );
assert.equal( WikiTextConverter.markdown2hatenak('####headline') , '****headline' );
assert.equal( WikiTextConverter.markdown2hatenak('-list') , '-list' );
assert.equal( WikiTextConverter.markdown2hatenak('    -list') , '--list' );
assert.equal( WikiTextConverter.markdown2hatenak('        -list') , '---list' );
assert.equal( WikiTextConverter.markdown2hatenak('1.list') , '+list' );
assert.equal( WikiTextConverter.markdown2hatenak('    1.list') , '++list' );
assert.equal( WikiTextConverter.markdown2hatenak('        1.list') , '+++list' );

console.log("=== textile2markdown ===");
assert.equal( WikiTextConverter.textile2markdown('h1. headline\n') , '#headline' );
assert.equal( WikiTextConverter.textile2markdown('h2. headline\n') , '##headline' );
assert.equal( WikiTextConverter.textile2markdown('h3. headline\n') , '###headline' );
assert.equal( WikiTextConverter.textile2markdown('h4. headline\n') , '####headline' );

console.log("=== markdown2textile ===");
assert.equal( WikiTextConverter.markdown2textile('#headline') , 'h1. headline\n' );
assert.equal( WikiTextConverter.markdown2textile('##headline') , 'h2. headline\n' );
assert.equal( WikiTextConverter.markdown2textile('###headline') , 'h3. headline\n' );
assert.equal( WikiTextConverter.markdown2textile('####headline') , 'h4. headline\n' );
