//CUSTOM CHECKBOX ...
//works also if there is relation label (by for) with input tag
$(function () {
    $('.checkbox-block')
        .on('click', changeCheckBoxState)
        .each(function () {
            changeCheckBoxState.call(this, null, true);
            changeCheckBoxState.call(this, null, true);
        });

    var ddData = [
        {
            text: "Карта",
            value: 1,
            selected: true,
            description: "Расплачусь картой",
            imageSrc: "img/visa-logo.png"
        },
        {
            text: "Наличные",
            value: 2,
            selected: false,
            description: "Расплачусь наличными",
            imageSrc: "img/cash.png"
        },
        {
            text: "Отработаю",
            value: 3,
            selected: false,
            description: "Платить нечем - готов отработать",
            imageSrc: "img/lopata.png"
        }
    ];

    $('#payment-select').ddslick({
        data: ddData,
        width: 300,
        imagePosition: "left"
    });

    $('#enter-form').submit(function () {
        var $paymentVariant = $('#payment-select')
            .find('.dd-option-selected')
            .find('.dd-option-value').attr('value');
        var $pizzaSelected;
        $('.pgwSlideshow').find('.ps-list').find('li').each(function (idx, elem) {
            if ($(elem).find('span').hasClass('ps-selected')) {
                $pizzaSelected = $(elem).attr('id');
                return true;
            }
        });
        $('#enter-form')
            .append('<input type="hidden" name="payment" value=' + $paymentVariant + '>')
            .append('<input type="hidden" name="pizza" value=' + $pizzaSelected + '>');
    });

    var options = {
        transitionEffect: 'fading',
        maxHeight: 450
    };

    $('.pgwSlideshow').pgwSlideshow(options);

    //init top menu - using native js
    [].forEach.call(document.querySelectorAll('.top-menu__item'), function (e) {
        e.addEventListener('mouseenter', showSubmenu);
        e.addEventListener('mouseleave', hideSubmenu);
    });
});

function changeCheckBoxState(e, init) {
    if (!$(this).find('input').attr('disabled') || init) {
        if ($(this).find('input').is(':checked')) {
            $(this).find('input').prop('checked', false);
            $(this).find('.checkbox-block__checkbox').css(
                'background-position', '0 0px'
            );
        } else {
            $(this).find('input').prop('checked', true);
            $(this).find('.checkbox-block__checkbox').css(
                'background-position', '0 -17px'
            );
        }
    }
}
//... CUSTOM CHECKBOX

//TOP MENU WITHOUT jQuery ...
function showSubmenu(event) {
    var subMenu = this.querySelector('.top-menu__submenu');
    if (subMenu) {
        subMenu.classList.add('displayed');
        subMenu.classList.remove('hidden');
    }
    event.stopPropagation();
}

function hideSubmenu(event) {
    var subMenu = this.querySelector('.top-menu__submenu');
    if (subMenu) {
        //it's need to hide immediately
        subMenu.classList.add('hidden');
        subMenu.classList.remove('displayed');
    }
    event.stopPropagation();
}

//... TOP MENU WITHOUT jQuery