/**
 * Created by Valk on 25.05.2016.
 */
"use_strict";
$(function(){
    var $slideWidth = $('.carousel__slide:first').prop('width');
    $('.carousel__paginator-button:first').attr('checked', true);
    $('.carousel__paginator-button').on('click', function(){
        var $currIdx = $(this).index();
        var shift = -$slideWidth*$currIdx+'px';
        $('.carousel__slide-wrapper:first').css({'margin-left':shift});
    });
});
