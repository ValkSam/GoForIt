/**
 * Created by Valk on 24.04.16.
 */
(function ($) {
    $.fn.ciclicCarousel = ciclicCarousel;
})(jQuery);

function ciclicCarousel(options) {
    var defaults = {
        imgs: [
            'img/1-1.png',
            'img/2-1.png',
            'img/2-1-1.png',
            'img/3-1.png',
            'img/3-1-1.png'
        ],
        imgHeight: '200px',
        imgVisibleCount: 3,
        imgBackgrountColor: 'white',
        arrowColor: 'rgba(255,255,255,0.8)',
        imgBorderColor: 'rgba(0,0,0,0.2)',
        onclick: function () {
        }
    };

    var settings = $.extend(defaults, options);
    var $carouselContainer = $('.carousel-container').css('display', 'inline-block');


    var $img;
    var $lastImg;
    var imgWidth = 0;
    var idx = 0;
    var leftPos = 0;
    var processing = false;

    var arrayStyle = {
        'float': 'left',
        'font-size': '36px',
        'cursor': 'pointer',
        /**/
        'width': '0',
        'height': '0',
        'border-top': '50px solid transparent',
        'border-bottom': '50px solid transparent',
        'margin': '50px 2px'
    };

    var leftArrayStyle = {
        'border-right': '20px solid ' + settings.arrowColor
    };

    var rightArrayStyle = {
        'border-left': '20px solid ' + settings.arrowColor
    };

    var $left = $('<div class="carousel-container__left"></div>')
        .css(arrayStyle)
        .css(leftArrayStyle)
        .on('click', shiftLeft);
    $carouselContainer.append($left);
    var $innerContainer = $('<div class="carousel-container__inner-container" style="float:left"></div>');
    $carouselContainer.append($innerContainer);
    var $itemsContainer = $('<ul class="carousel-container__items-container" style="overflow: hidden"></ul>');
    $innerContainer.append($itemsContainer);
    var $right = $('<div class="carousel-container__right"></div>')
        .css(arrayStyle)
        .css(rightArrayStyle)
        .on('click', shiftRight);
    $carouselContainer.append($right);


    $("<div></div> ").insertAfter($right).css({
            'display': 'block',
            'content': '',
            'clear': 'both'
        }
    );

    settings.imgHeight = +settings.imgHeight.replace('px', '');

    settings.imgs.forEach(function (e) {
        var $item = $('<li class="carousel-container__item"><img src="' + e + '" alt=""><p>' + e + '</p></li>');
        $item.css({
            'display': 'inline-block',
            'list-style-type': 'none',
            'border': '1px solid ' + settings.imgBorderColor,
            'box-sizing': 'border-box',
            'visibility': 'hidden',
            'text-align': 'center'
        });
        $item.find('p').css({
            'line-height': '18px',
            'height': '18px',
            'padding': '0 0 0 0',
            'text-align': 'center'
        });
        $img = $item.find('img').css({
            'height': settings.imgHeight + 'px'
        });
        $lastImg = $img;
        $lastImg.prop('id', idx++);
        $img.one('load', reSetImgWidth).prop('id', idx);
        $img.on('click', {src: e}, settings.onclick);
        $itemsContainer.append($item);
    });

    function reSetImgWidth() {
        if (imgWidth < $(this).prop('width')) {
            imgWidth = Math.ceil($(this).prop('width'));
        }
        if ($(this).prop('id') == $lastImg.prop('id')) {
            $innerContainer.find('img').each(function () {
                $(this).parent().css('width', imgWidth);
            });
            $innerContainer.find('li').css('backgroundColor', settings.imgBackgrountColor);
            setCarouselContainerSize();
        }
    }

    function setCarouselContainerSize() {
        $innerContainer.css(
            {
                'height': (settings.imgHeight + 20) + 'px',
                'width': (imgWidth) * settings.imgVisibleCount,
                'overflow': 'hidden'
            }
        );
        $left.css('line-height', settings.imgHeight + 'px');
        $right.css('line-height', settings.imgHeight + 'px');
        $innerContainer.find('li').css('visibility', 'visible');
    }

    function shiftLeft() {
        if (processing) return;
        processing = true;
        leftPos -= imgWidth;
        var $leftItem = $('.carousel-container__item:first');
        var $lastItem = $leftItem.clone(true);
        var origWidth = parseInt($innerContainer.css('width'));
        $itemsContainer.css('width', origWidth + imgWidth + 'px');
        $itemsContainer.append($lastItem);
        $itemsContainer.animate({'margin-left': -imgWidth + 'px'}, 500, function () {
            $leftItem.remove();
            $itemsContainer.css({'margin-left': '0px'});
            $itemsContainer.css('width', origWidth + 'px');
            processing = false;
        });
    }

    function shiftRight() {
        if (processing) return;
        processing = true;
        leftPos -= imgWidth;
        var $leftItem = $('.carousel-container__item:first');
        var $rightItem = $('.carousel-container__item:last');
        var $firstItem = $rightItem.clone(true);
        var origWidth = parseInt($innerContainer.css('width'));
        $itemsContainer.css('width', origWidth + imgWidth + 'px');
        $firstItem.insertBefore($leftItem);
        $itemsContainer.css({'margin-left': -imgWidth + 'px'});
        $itemsContainer.animate({'margin-left': 0 + 'px'}, 500, function () {
            $rightItem.remove();
            $itemsContainer.css('width', origWidth + 'px');
            processing = false;
        });
    }


}
