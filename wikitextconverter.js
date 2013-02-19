if (typeof(WikiTextConverter) == 'undefined') {
    WikiTextConverter = {};
    WikiTextConverter.VERSION = 0.1;
    /*  Hatena => */
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

        // blockquote
        text = text.replace(/^\>\>\n([\s\S]*?)\n\<\</mg, function() {
            return 'bq.' + arguments[1] + '\n';
        });

        // list
        text = text.replace(/^([\-]+)/mg, function () {return arguments[0].replace(/\-/g, '*')});
        text = text.replace(/^([\+]+)/mg, function () {return arguments[0].replace(/\+/g, '#')});

        // link
        text = text.replace(/\[(https?:\/\/.*?)(?:\:title=(.*?))\]/mg, function () {
            return '"' + arguments[2] + '":' + arguments[1];
        });
        return text;
    }
    WikiTextConverter.hatenak2markdown = function(text) {
        // Headline
        text = text.replace(/^([\*]{1,4})/mg, function () {return arguments[0].replace(/\*/g, '#')});

        // table none

        // pre none

        // blockquote
        text = text.replace(/^\>\>\n([\s\S]*?)\n\<\</mg, function() {
            return '> ' + arguments[1] + '\n';
        });

        // TODO list
        //text = text.replace(/^([\-]+)/mg, function () {
        //    return arguments[0].replace(/([\-]+)\-/g, function() {return arguments[1].replace('-','    ') + '*' });
        //});

        // link
        text = text.replace(/\[(https?:\/\/.*?)(?:\:title=(.*?))\]/mg, function () {
            return '[' + arguments[2] + '](' + arguments[1] + ')';
        });
        return text;
    }
    /* => Hatena */
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

        // blockquote
        text = text.replace(/^bq\.([\s\S]*?)\n\n/mg, function() {
            return '>>\n' + arguments[1] + '\n<<\n';
        });

        // list
        text = text.replace(/^([\*]+)/mg, function () {return arguments[0].replace(/\*/g, '-')});
        text = text.replace(/^([#]+)/mg, function () {return arguments[0].replace(/#/g, '+')});

        // TODO link

        // Headline
        text = text.replace(/^h([1-4]{1})\. (.*)/mg, function() {
            var count = arguments[1] - 0;
            var headline = "";
            for (var i = 0; i < count; i++) {headline += "*";}
            return headline + arguments[2];
        });

        return text;
    }
    WikiTextConverter.markdown2hatenak = function(text) {
        // Headline
        text = text.replace(/^([\#]{1,4})/mg, function () {return arguments[0].replace(/#/g, '*')});

        // table none

        // pre none

        // blockquote
        text = text.replace(/^> ([\s\S]*?)\n\n/mg, function() {
            return '>>\n' + arguments[1] + '\n<<\n';
        });

        // TODO list

        // link
        text = text.replace(/\[(.*?)\]\((https?:\/\/.*?)\)/mg, function () {
            return '[' + arguments[2] + ':title='+ arguments[1] + ']';
        });

        return text;
    }
    /* => Hatena => */
    WikiTextConverter.textile2markdown = function(text) {
        return WikiTextConverter.hatenak2markdown(WikiTextConverter.textile2hatenak(text));
    }
    WikiTextConverter.markdown2textile = function(text) {
        return WikiTextConverter.hatenak2textile(WikiTextConverter.markdown2hatenak(text));
    }
}
