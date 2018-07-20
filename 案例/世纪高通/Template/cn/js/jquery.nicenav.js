; (function ($) {
    $.extend({
        'nicenav': function (con) {
            con = typeof con === 'number' ? con : 400;
            var $lis = $('#nav>li'),$h = $('#buoy');
            $lis.hover(function () {
                if($(this).index()==0){
                    $h.stop().animate({
                        'left': $(this).offsetParent().context.offsetLeft,
                        'width': '30px'
                    }, con);
                }else{
                    $h.stop().animate({
                        'left': $(this).offsetParent().context.offsetLeft,
                        'width': '56px'
                    }, con);
                }
            }, function () {
                
            })
$('.headBox,.headBox_an').mouseleave(function(event) {
setTimeout(function(){
$h.stop().animate({
                    'left': '-157px'
                }, con);
}, 500)
});
        }
    });
}(jQuery));