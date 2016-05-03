$(function () {
    $('body').ciclicCarousel({
        imgs: [
            'img/1-1.png',
            'img/2-1.png',
            'img/2-1-1.png',
            'img/3-1.png',
            'img/3-1-1.png'
        ],
        onclick: function (event) {
            img = {
                src: event.data.src
            };
            var content = tmpl($template, img);
            $('.my-choice').append(content);
        }
    });

    var $template = $('#img-block').html();


});


