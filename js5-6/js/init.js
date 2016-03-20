/*init timer*/

var splitTimer = new FormattedSplitTimer();
splitTimer.interval = 1;

/*init control-panel buttons*/

[].forEach.call(document.querySelectorAll('.timer-panel__button'), function (element) {
    element.addEventListener('click', function () {
        if (this.getAttribute('value') == 'Start') {
            this.setAttribute('value', 'Stop');
            splitTimer.start(function (timer) {
                document.querySelector('.timer-panel__digit-timer').innerHTML = timer.formatedElapsedTime;
            });
        } else if (this.getAttribute('value') == 'Stop') {
            this.setAttribute('value', 'Start');
            splitTimer.stop();
            splitTimer.newLogItems().forEach(function (item) {
                var logItem = document.createElement('div');
                logItem.classList.add('splitlog-panel__item');
                logItem.innerHTML = item.logNumber + ' ' + item.command + ': ' + item.elapsedTime;
                document.querySelector('.splitlog-panel').appendChild(logItem);
            });
            document.querySelector('.splitlog-panel').scrollTop = 999999;
        } else if (this.getAttribute('value') == 'Split') {
            splitTimer.split();
            splitTimer.newLogItems().forEach(function (item) {
                var logItem = document.createElement('div');
                logItem.classList.add('splitlog-panel__item');
                logItem.innerHTML = item.logNumber + ' ' + item.command + ': ' + item.elapsedTime;
                document.querySelector('.splitlog-panel').appendChild(logItem);
            });
            document.querySelector('.splitlog-panel').scrollTop = 999999;

        } else if (this.getAttribute('value') == 'Reset') {
            splitTimer.reset();
            document.querySelector('.timer-panel__digit-timer').innerHTML = splitTimer.formatedElapsedTime;
            document.querySelector('#start').setAttribute('value', 'Start');
            var parent = document.querySelector('.splitlog-panel');
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    });
});

/*init top menu buttons*/

[].forEach.call(document.querySelectorAll('.top-menu-bar__item'), function (element) {
    element.addEventListener('click', function () {
        [].forEach.call(this.parentNode.childNodes, function (elem) {
            if (elem.nodeType == 1) elem.removeAttribute('data-active');
        });
        if (this.parentNode.classList.contains('top-menu-bar__sizer-menu')) {
            document.querySelector('.timer-panel__digit-timer').setAttribute('data-size', this.innerHTML);
        }
        if (this.parentNode.classList.contains('top-menu-bar__color-menu')) {
            document.querySelector('body').setAttribute('data-color', this.innerHTML);
        }
        this.setAttribute('data-active', '');
    })
});

