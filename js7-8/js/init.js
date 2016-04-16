$(function () {
    +function init() {
        $('.tab-container__tab-list-item').click(tabClickHandler);
        tabClickHandler.apply($('.tab-container__tab-list-item[active]'));
        /**/
        $('.form-help__input').mouseover(displayTip).mouseleave(displayTip);
        $('.form-help__help-button').click(displayTip);
        /*центрируем tip по высоте*/
        var inputHeight = $('.form-help__input').outerHeight();
        var tipHeight = $('.form-help__tip').outerHeight();
        var marginForTip = (inputHeight - tipHeight) / 2;
        $('.form-help__tip').css('margin-top', marginForTip);

    }();

    function tabClickHandler() {
        var idx = $(this).index();
        $(this).siblings().removeAttr('active');
        $(this).attr('active', '');
        $(this).parent('.tab-container__tab-list')
            .siblings('.tab-container__page-list')
            .children('.tab-container__page-list-item')
            .removeAttr('active');
        $(this).parent('.tab-container__tab-list')
            .siblings('.tab-container__page-list')
            .children('.tab-container__page-list-item:nth-child(' + (idx + 1) + ')')
            .attr('active', '');
    }


    function displayTip() {
        if ($(this).hasClass('form-help__help-button')) {
            if (!$('.form-help__tip').first().attr('active')) {
                $('.form-help__tip').attr('active', 'true');
            } else {
                $('.form-help__tip').removeAttr('active');
            }
        } else {
            $('.form-help__tip').removeAttr('active');
            var tip = $(this).next();
            if (!tip.attr('active')) {
                tip.attr('active', 'true');
            } else {
                tip.removeAttr('active');
            }
        }
    }
})