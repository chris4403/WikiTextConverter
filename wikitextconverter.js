if (typeof(WikiTextConverter) == 'undefined') {
    WikiTextConverter = {};
    WikiTextConverter.VERSION = 0.1;
    WikiTextConverter.hatenak2textile = function(text) {
        // Headline
        var headline = function(num,t) {return 'h' + num + '. ' + t + '\n'}
        text = text.replace(/^\*\*\*\*(.*)/mg, function() {return headline(4,arguments[1])})
                   .replace(/^\*\*\*(.*)/mg,  function() {return headline(3,arguments[1])})
                   .replace(/^\*\*(.*)/mg,  function() {return headline(2,arguments[1])})
                   .replace(/^\*(.*)/mg, function() {return headline(1,arguments[1])});
        // table
        text = text.replace(/\|\*([.^\|]*)/mg, function() {return '|_. ' + arguments[1];});
        // pre
        text = text.replace(/^\>\|(.*)\|\n([\s\S]*?)\n\|\|\</mg, function() {
            if (arguments[1]) {
                return '<pre><code class="'+ arguments[1] + '">\n' + arguments[2] + '\n</code></pre>\n';
            } else {
                return '<pre>\n' + arguments[2] + '\n</pre>\n';
            }
        });
        // list
        text = text.replace(/^([\-]+)/mg, function () {return arguments[0].replace(/\-/g, '*')})
        return text;
    }
}
