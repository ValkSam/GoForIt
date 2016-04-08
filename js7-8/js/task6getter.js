/**
 * Created by Valk on 14.03.16.
 *
 * input вложенный в label (без аттрибута for)
 */
(function task6() {
    var TIMER_STATE = Object.create(null);
    TIMER_STATE.NEW = 0;
    TIMER_STATE.STARTED = 1;
    TIMER_STATE.PAUSED = 2;
    TIMER_STATE.RESTARTED = 3;


    function Timer() {
        var _interval = 0;
        var _callback = undefined;
        var _timerId = undefined;
        var _tickCounter = 0;
        var _startedTime = 0;
        var _elapsedTime = 0;
        var _state = TIMER_STATE.NEW;

        Object.defineProperties(this, {
            timerId: {
                get: function () {
                    return _timerId;
                },
                set: function (value) {
                    _timerId = value;
                }
            },
            state: {
                get: function () {
                    return _state;
                },
                set: function (value) {
                    _state = value;
                }
            },
            tickCounter: {
                get: function () {
                    return _tickCounter;
                },
                set: function (value) {
                    _tickCounter = value;
                }
            },
            interval: {
                get: function () {
                    return _interval;
                },
                set: function (value) {
                    _interval = value;
                }
            },
            startedTime: {
                get: function () {
                    return _startedTime;
                },
                set: function (value) {
                    _startedTime = value;
                }
            },
            elapsedTime: {
                get: function () {
                    return _elapsedTime;
                },
                set: function (value) {
                    _elapsedTime = value;
                }
            },
            callback: {
                get: function () {
                    return _callback;
                },
                set: function (value) {
                    _callback = value;
                }
            }
        });
    }

    Timer.prototype.start = function (callback) {
        if (this.state === TIMER_STATE.NEW) {
            this.state = TIMER_STATE.STARTED;
            this.callback = callback;
        } else {
            this.state = TIMER_STATE.RESTARTED;
        }

        this.startedTime = new Date().getTime() - (this.elapsedTime);

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
        this.state = TIMER_STATE.PAUSED;
        clearInterval(this.timerId);
    };

    Timer.prototype.reset = function () {
        this.stop();
        this.state = TIMER_STATE.NEW;
        this.tickCounter = 0;
        this.elapsedTime = 0;
    };

    /*=====================================*/

    function SplitTimer() {
        Timer.apply(this, arguments);

        var _localTickCounter = 0;
        var _localStartedTime = 0;
        var _localElapsedTime = 0;
        var _splitLog = [];
        var _lastReturnedItemIdx = -1;

        Object.defineProperties(this, {
            localTickCounter: {
                get: function () {
                    return _localTickCounter;
                },
                set: function (value) {
                    _localTickCounter = value;
                }
            },
            localStartedTime: {
                get: function () {
                    return _localStartedTime;
                },
                set: function (value) {
                    _localStartedTime = value;
                }
            },
            localElapsedTime: {
                get: function () {
                    return _localElapsedTime;
                },
                set: function (value) {
                    _localElapsedTime = value;
                }
            },
            splitLog: {
                get: function () {
                    return _splitLog;
                }
            },
            lastReturnedItemIdx: {
                get: function () {
                    return _lastReturnedItemIdx;
                }
                ,
                set: function (value) {
                    _lastReturnedItemIdx = value;
                }
            },
            newLogItems: {
                get: function () {
                    var result = _splitLog.slice(_lastReturnedItemIdx + 1, _splitLog.length);
                    _lastReturnedItemIdx = _splitLog.length - 1;
                    return result;
                }
            }
        })
    }

    SplitTimer.prototype = Object.create(Timer.prototype);
    SplitTimer.prototype.constructor = SplitTimer;

    SplitTimer.prototype.start = function (callback) {
        this.localStartedTime = new Date().getTime();

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
        this.split("stop");
        this.localTickCounter = 0;
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

    /*=====================================*/

    function FormattedSplitTimer() {
        SplitTimer.apply(this, arguments);

        function formatTime(time) {
            time = new Date(time);
            var h = time.getHours() + time.getTimezoneOffset() / 60; //корректируем часы на часовой пояс
            h = (h.toString()).length == 2 ? h : '0' + h;
            var m = (time.getMinutes().toString()).length == 2 ? time.getMinutes() : '0' + time.getMinutes();
            var s = (time.getSeconds().toString()).length == 2 ? time.getSeconds() : '0' + time.getSeconds();
            var ms = (time.getMilliseconds().toString()).length == 3 ? time.getMilliseconds() :
                (time.getMilliseconds().toString()).length == 2 ? '0' + time.getMilliseconds() : '00' + time.getMilliseconds();
            return h + ':' + m + ':' + s + '.' + ms;
        }

        this.formatTime = formatTime;

        Object.defineProperties(this, {
            formatedElapsedTime: {
                get: function () {
                    return formatTime(this.elapsedTime);
                }
            }
        });
    }

    FormattedSplitTimer.prototype = Object.create(SplitTimer.prototype);
    FormattedSplitTimer.prototype.constructor = FormattedSplitTimer;

    FormattedSplitTimer.prototype.split = function (command) {
        var lastItem = SplitTimer.prototype.split.apply(this, arguments);
        if (lastItem) {
            lastItem.elapsedTime = this.formatTime(lastItem.elapsedTime);
        }
        return lastItem;
    };
    
    /*=====================================*/

    var splitTimer = new FormattedSplitTimer();
    splitTimer.interval = 1;

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
                splitTimer.newLogItems.forEach(function (item) {
                    var logItem = document.createElement('div');
                    logItem.classList.add('splitlog-panel__item');
                    logItem.innerHTML = item.logNumber + ' ' + item.command + ': ' + item.elapsedTime;
                    document.querySelector('.splitlog-panel').appendChild(logItem);
                });
            } else if (this.getAttribute('value') == 'Split') {
                splitTimer.split();
                splitTimer.newLogItems.forEach(function (item) {
                    var logItem = document.createElement('div');
                    logItem.classList.add('splitlog-panel__item');
                    logItem.innerHTML = item.logNumber + ' ' + item.command + ': ' + item.elapsedTime;
                    document.querySelector('.splitlog-panel').appendChild(logItem);
                });

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

})();


/*
 Timer.prototype.startCount = function(){
 var timer = this;
 this.timer = setTimeout(function time(){
 timer.counter++;
 console.log(timer);
 timer.timer = setTimeout(time, timer.interval);
 timer.callback(timer); //именно после setTimeout, т.к в callback будет clearTimeout(this.timer), который должен не должен быть еще запущен
 }, this.interval)
 };

 Timer.prototype.stopCount = function(){
 clearTimeout(this.timer);
 };*/


/*
 function Timer(callback){
 var millisec = 0;
 var counter = 0;
 var interval = 0;
 var timerId = undefined;

 this.getCounter = function(){
 return counter;
 };

 this.startCount = function(){
 timer = this;
 timerId = setInterval(function tick(){
 counter++;
 callback(timer);
 }, interval);
 };

 this.stopCount = function(){
 clearInterval(timerId);
 };
 }


 var limit = 5;
 var cb = function(timer){
 console.log(timer.counter);
 if (timer.getCounter() > limit) {
 timer.stopCount();
 }
 };*/
