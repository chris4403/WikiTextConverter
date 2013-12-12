function convertText(type) {
    var selection = window.getSelection();
    if (!selection.toString().length) return;
    // anchroNode と focusNode が同じで、かつその下に textarea がある時のみ発動する
    var anchorNode = selection.anchorNode;
    var focusNode = selection.focusNode;
    if (anchorNode === focusNode && !!$(anchorNode).find('textarea').length) {
        var $textarea = $(anchorNode).find('textarea');
        $textarea.val(WikiTextConverter[type]($textarea.val()));
    }
}

convertText(window.funcname);
