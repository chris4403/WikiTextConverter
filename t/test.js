var fs = require('fs');
var vm = require('vm');


var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code,path);
}.bind(this);
includeInThisContext("../wikitextconverter.js");

var is = function() {
    if (arguments[0] === arguments[1]) console.log('ok',(arguments[2]) ? arguments[2] : "");
    else console.log('ng', arguments[0], arguments[1]);
}


console.log("=== start test ===");
console.log("=== typeof ===");
is( typeof WikiTextConverter, "object" );
is( typeof WikiTextConverter.hatenak2textile, "function" );
is( typeof WikiTextConverter.hatenak2markdown, "function" );
is( typeof WikiTextConverter.textile2hatenak, "function" );
is( typeof WikiTextConverter.markdown2hatenak, "function" );

console.log("=== hatenak2textile ===");
var hatena2text = "";
