var limit = 2;
var cb = function (timer) {
    console.log(timer.tickCounter);
    if (timer.tickCounter >= limit) {
        timer.stop();
    }
};

var timer = new Timer(stopCb);
timer.interval = 1000;
timer.start(cb);

//while (timer.state === TIMER_STATE.STARTED){}


function stopCb() {
    console.log("timer stopped");


    cb = function (timer) {
        console.log(timer.tickCounter);
        if ((timer.tickCounter === 4)
            || (timer.tickCounter === 6)
            || (timer.tickCounter === 9)
            || (timer.tickCounter === 11)
            || (timer.tickCounter === 19)) {
            timer.split();
            console.log("------");
            timer.splitLog.forEach(function(e){
                console.dir(e.command+' '+ e.currentTickCounter+' '+ e.currentTime);
            });
            console.log("------");
        }

        if ((timer.tickCounter === 10)) {
            timer.stop();
            console.log("------");
            timer.splitLog.forEach(function(e){
                console.dir(e.command+' '+ e.currentTickCounter+' '+ e.currentTime);
            });
            console.log("------");
            timer.start();
        }

        if (timer.tickCounter >= limit) {
            timer.reset();
        }
    };

    limit = 22;
    var splitTimer = new SplitTimer();
    splitTimer.interval = 500;
    splitTimer.start(cb);
}