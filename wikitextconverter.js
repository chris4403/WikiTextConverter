if (typeof(WikiTextConverter) == 'undefined') {
    WikiTextConverter = {};
    WikiTextConverter.VERSION = 0.1;
    WikiTextConverter.hatenak2textile = function(text) {
        // Headline
        var headline = function() {return 'h' + (arguments[1].split('*').length - 1) + '. ' + arguments[2] + '\n'}
        text = text.replace(/^([\*]{1,4})(.*)/mg, headline);

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
        text = text.replace(/^([\-]+)/mg, function () {return arguments[0].replace(/\-/g, '*')});
        text = text.replace(/^([\+]+)/mg, function () {return arguments[0].replace(/\+/g, '#')});
        return text;
    }
    WikiTextConverter.hatenak2markdown = function(text) {
        // Headline
        text = text.replace(/^([\*]{1,4})/mg, function () {return arguments[0].replace(/\*/g, '#')});

        // table none

        // pre none

        // list
        // TODO

        return text;
    }
    WikiTextConverter.textile2hatenak = function(text) {

        // table
        text = text.replace(/\|\_\.([.^\|]*)/mg, function() {return '|* ' + arguments[1];});

        // pre
        text = text.replace(/^\<pre\>\<code class="(.*?)"\>\n([\s\S]*?)\n\<\/code\>\<\/pre\>\n/mg, function() {
            return '>|' + arguments[1] + '|\n' + arguments[2] + '\n||<\n';
        });
        text = text.replace(/^\<pre\>\n([\s\S]*?)\n\<\/pre\>\n/mg, function() {
            return '>||\n' + arguments[1] + '\n||<\n';
        });

        // list
        text = text.replace(/^([\*]+)/mg, function () {return arguments[0].replace(/\*/g, '-')});
        text = text.replace(/^([#]+)/mg, function () {return arguments[0].replace(/#/g, '+')});

        // Headline
        text = text.replace(/^h([1-4]{1})\. (.*)/mg, function() {
            var count = arguments[1] - 0;
            var headline = "";
            for (var i = 0; i < count; i++) {headline += "*";}
            return headline + arguments[2];
        });

        return text;
    }
}
