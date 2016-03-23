/*init timer*/

var splitTimer = new FormattedSplitTimer();
splitTimer.interval = 1;

/*init control-panel buttons*/

function clickTimerPanelButtonEventHandler() {
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
            logItem.className = 'splitlog-panel__item';
            //logItem.classList.add('splitlog-panel__item'); не для IE10-
            logItem.innerHTML = item.logNumber + ' ' + item.command + ': ' + item.elapsedTime;
            document.querySelector('.splitlog-panel').appendChild(logItem);
        });
        document.querySelector('.splitlog-panel').scrollTop = 999999;
    } else if (this.getAttribute('value') == 'Split') {
        splitTimer.split();
        splitTimer.newLogItems().forEach(function (item) {
            var logItem = document.createElement('div');
            logItem.className = 'splitlog-panel__item';
            //logItem.classList.add('splitlog-panel__item'); не для IE10-
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
}

[].forEach.call(document.querySelectorAll('.timer-panel__button'), function (element) {
    if (element.addEventListener) {
        element.addEventListener('click', clickTimerPanelButtonEventHandler);
    } else {
        element.attachEvent('onclick', clickTimerPanelButtonEventHandler);  //вообще не планируется поддержка IE8-
    }
});

/*init top menu buttons*/

[].forEach.call(document.querySelectorAll('.top-menu-bar__item'), function (element) {
    element.addEventListener('click', function () {
        var currentState = this.getAttribute('data-active') != null;
        [].forEach.call(this.parentNode.childNodes, function (elem) {
            if (elem.nodeType == 1) elem.removeAttribute('data-active');
        });
        if (this.parentNode.className.indexOf('top-menu-bar__sizer-menu') != -1) {
            document.querySelector('.timer-panel__digit-timer').setAttribute('data-size', this.innerHTML);
        }
        if (this.parentNode.className.indexOf('top-menu-bar__color-menu') != -1) {
            document.querySelector('body').setAttribute('data-color', this.innerHTML);
        }
        if (this.className.indexOf('top-menu-bar__item--msec') == -1) {
            this.setAttribute('data-active', '');
        } else {
            if (!currentState) {
                this.setAttribute('data-active', '');
            }
            splitTimer.showMsec = !splitTimer.showMsec;
        }
    })
});



