function handler(from, to) {
    return function(info, tab) {
        var funcname = from.toLowerCase() + '2' + to.toLowerCase();
        chrome.tabs.executeScript(tab.id, {
            file: "jquery-1.9.1.min.js"
        });
        chrome.tabs.executeScript(tab.id, {
            file: "wikitextconverter.js"
        });
        chrome.tabs.executeScript(tab.id, {
            code: "var funcname = '" + funcname + "'"
        });
        chrome.tabs.executeScript(tab.id, {
            file: "convert.js"
        });
        console.log(funcname);
    }
}

var transes = [
    [ "Hatenak", "Textile" ],
    [ "Textile", "Hatenak" ],
    [ "Hatenak", "Markdown" ],
    [ "Markdown", "Hatenak" ],
    [ "Textile", "Markdown" ],
    [ "Markdown", "Textile" ],
]

transes.forEach(function(trans) {
    var from = trans[0];
    var to   = trans[1];
    var title = from + " => " + to;
    chrome.contextMenus.create({
        title: title,
        contexts: ["editable"],
        onclick: handler(from, to)
    });
});
