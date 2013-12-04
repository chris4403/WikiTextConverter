       $(function() {
           var $original = $('#original');
           var $type = $('#type');
           var updatePreview = function () {
             var type = $type.val();
             var func = WikiTextConverter[type];
             $('#converted').val(func($original.val()));
           };
           $original.on('keyup', updatePreview);
           $type.on('change', updatePreview);
       });
