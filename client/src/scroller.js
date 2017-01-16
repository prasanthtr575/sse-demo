jQuery.fn.extend({
    pic_scroll:function (){
        $(this).each(function(){
            var _this=$(this);
            var ul=_this.find("ul");//Get the ul object
            var li=ul.find("li");//Get all the pictures of all
            var w=li.size()*li.outerWidth();//Stats the length of the image
            li.clone().prependTo(ul);//Clone picture into a ul
            ul.width(2*w);//Set the length of ul so that all the images are arranged in a row
            var i=1,l;
            //_this.hover(function(){i=0},function(){i=1});//When the mouse is set i = 0 to achieve the mouse after the stop effect
            function autoScroll(){
                l = _this.scrollLeft();
                if(l>=w){
                    _this.scrollLeft(0);
                }else{
                    _this.scrollLeft(l + i);
                }
            }
            var scrolling = setInterval(autoScroll,12);
        })
    }
});

$(function(){
    $(".track").pic_scroll();
})