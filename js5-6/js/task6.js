/**
 * Created by Valk on 14.03.16.
 *
 */

var TIMER_STATE = Object.create(null);
TIMER_STATE.NEW = 0;
TIMER_STATE.STARTED = 1;
TIMER_STATE.PAUSED = 2;
TIMER_STATE.RESTARTED = 3;
TIMER_STATE.CHANGE_INTERVAL = 4;


/*Timer =====================================*/

function Timer() {
    var _interval = 0;
    var _showMsec = true;
    this.callback = undefined;
    this.timerId = undefined;
    this.tickCounter = 0;
    this.startedTime = 0;
    this.elapsedTime = 0;
    this.state = TIMER_STATE.NEW;

    var that = this;

    Object.defineProperties(this, {
        interval: {
            get: function () {
                return _showMsec ? _interval : Math.max(_interval, 1000);
            },
            set: function (value) {
                _interval = value;
            }
        },
        showMsec: {
            get: function () {
                return _showMsec;
            },
            set: function (value) {
                _showMsec = value;
                if ((that.state != TIMER_STATE.PAUSED) && (that.state != TIMER_STATE.NEW)) {
                    that.state = TIMER_STATE.CHANGE_INTERVAL;
                    that.stop();
                    that.start();
                }
            }
        }
    });
}

Timer.prototype.start = function (callback) {
    if (this.state != TIMER_STATE.CHANGE_INTERVAL) {
        this.startedTime = new Date().getTime() - (this.elapsedTime);
    }

    if (this.state === TIMER_STATE.NEW) {
        this.state = TIMER_STATE.STARTED;
        this.callback = callback;
    } else {
        this.state = TIMER_STATE.RESTARTED;
    }

    var that = this;
    this.timerId = setInterval(function tick() {
        that.tickCounter++;
        that.elapsedTime = new Date().getTime() - that.startedTime;
        if (that.callback) {
            that.callback(that);
        }
    }, this.interval);
};

Timer.prototype.stop = function () {
    clearInterval(this.timerId);
    if (this.state != TIMER_STATE.CHANGE_INTERVAL) {
        this.state = TIMER_STATE.PAUSED;
    }
};

Timer.prototype.reset = function () {
    this.stop();
    this.state = TIMER_STATE.NEW;
    this.tickCounter = 0;
    this.elapsedTime = 0;
};

/*SplitTimer =====================================*/

function SplitTimer() {
    Timer.apply(this, arguments);

    this.localTickCounter = 0;
    this.localStartedTime = 0;
    this.localElapsedTime = 0;
    this.splitLog = [];
    this.lastReturnedItemIdx = -1;

    this.newLogItems = function () {
        var result = this.splitLog.slice(this.lastReturnedItemIdx + 1, this.splitLog.length);
        this.lastReturnedItemIdx = this.splitLog.length - 1;
        return result;
    };
}

SplitTimer.prototype = Object.create(Timer.prototype);
SplitTimer.prototype.constructor = SplitTimer;

SplitTimer.prototype.start = function (callback) {
    if (this.state != TIMER_STATE.CHANGE_INTERVAL) {
        this.localStartedTime = new Date().getTime();
    }

    var innerCallback = function (timer) {
        /*innerCallback вызывается как callback в Timer.start()*/
        timer.localTickCounter++; //добавляем изменение localTickCounter
        timer.localElapsedTime = new Date().getTime() - timer.localStartedTime;
        /*вызываем внешний callback*/
        if (callback) {
            callback(timer);
        }
    };
    Timer.prototype.start.call(this, innerCallback);
};

SplitTimer.prototype.stop = function () {
    if (this.state != TIMER_STATE.CHANGE_INTERVAL) {
        var lastItem = this.split("stop");
        this.localTickCounter = 0;
    }
    Timer.prototype.stop.apply(this, arguments);
};

SplitTimer.prototype.reset = function () {
    Timer.prototype.reset.apply(this, arguments);
    this.splitLog.length = 0;
    this.lastReturnedItemIdx = -1;
};

SplitTimer.prototype.split = function (command) {
    if (this.state === TIMER_STATE.STARTED || this.state === TIMER_STATE.RESTARTED) {
        return this.splitLog[this.splitLog.push({
            logNumber: this.splitLog.length + 1,
            command: command ? command : 'split',
            tickCounter: this.localTickCounter,
            elapsedTime: this.localElapsedTime
        }) - 1];
    }
    return null;
};

/*FormattedSplitTimer =====================================*/

function FormattedSplitTimer() {
    SplitTimer.apply(this, arguments);

    function formatTime(timer, time) {
        time = new Date(time);
        var h = time.getHours() + time.getTimezoneOffset() / 60; //корректируем часы на часовой пояс
        h = (h.toString()).length == 2 ? h : '0' + h;
        var m = (time.getMinutes().toString()).length == 2 ? time.getMinutes() : '0' + time.getMinutes();
        var s = (time.getSeconds().toString()).length == 2 ? time.getSeconds() : '0' + time.getSeconds();
        var ms = '';
        if (timer.showMsec) {
            ms = (time.getMilliseconds().toString()).length == 3 ? time.getMilliseconds() :
                (time.getMilliseconds().toString()).length == 2 ? '0' + time.getMilliseconds() : '00' + time.getMilliseconds();
            ms = '.' + ms;
        }
        return h + ':' + m + ':' + s + ms;
    }

    this.formatTime = formatTime;

    Object.defineProperties(this, {
        formatedElapsedTime: {
            get: function () {
                return formatTime(this, this.elapsedTime);
            }
        }
    });
}

FormattedSplitTimer.prototype = Object.create(SplitTimer.prototype);
FormattedSplitTimer.prototype.constructor = FormattedSplitTimer;

FormattedSplitTimer.prototype.split = function (command) {
    var lastItem = SplitTimer.prototype.split.apply(this, arguments);
    if (lastItem) {
        lastItem.elapsedTime = this.formatTime(this, lastItem.elapsedTime);
    }
    return lastItem;
};

/*=====================================*/


