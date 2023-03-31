document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const timeVal = document.getElementById('timeBox');
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const resetButton = document.getElementById('resetButton');

    let startTime = 0;
    let elapsedTime = 0;
    let paused = true;
    let intervalId;
    let hrs = 0;
    let mins = 0;
    let secs = 0;

    startButton.addEventListener('click', () => {
        if (paused) {
            paused = false;
            startTime = Date.now() - elapsedTime;
            intervalId = setInterval(updateTime, 1000);
        }
    });
    pauseButton.addEventListener('click', () => {
        if (!paused) {
            paused = true;
            elapsedTime = Date.now() - startTime;
            clearInterval(intervalId);
        }
    });
    resetButton.addEventListener('click', () => {
        paused = true;
        clearInterval(intervalId);
        startTime = 0;
        elapsedTime = 0;
        hrs = 0;
        mins = 0;
        secs = 0;
        timeVal.textContent = "00:00:00";
    });

    function updateTime() {
        elapsedTime = Date.now() - startTime;
        
        secs = Math.floor((elapsedTime / 1000) % 60);
        mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
        hrs = Math.floor((elapsedTime / (1000 * 60 * 60) % 24));

        secs = pad(secs);
        mins = pad(mins);
        hrs = pad(hrs);

        timeVal.textContent = `${hrs}:${mins}:${secs}`;

        function pad(unit) {
            return (("0" + unit).length > 2) ? unit : "0" + unit;
        }
    }
}
