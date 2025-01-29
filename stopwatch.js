let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 1;
let lapList = [];

const timeDisplay = document.getElementById("timeDisplay");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapListDisplay = document.getElementById("lapList");

function startStopwatch() {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        startStopBtn.innerHTML = "Stop";
        lapBtn.disabled = false;
    } else {
        running = false;
        clearInterval(tInterval);
        startStopBtn.innerHTML = "Start";
        lapBtn.disabled = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    timeDisplay.innerHTML = formatTime(hours, minutes, seconds);
}

function formatTime(hours, minutes, seconds) {
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return hours + ":" + minutes + ":" + seconds;
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    timeDisplay.innerHTML = "00:00:00";
    startStopBtn.innerHTML = "Start";
    lapList = [];
    lapCount = 1;
    lapBtn.disabled = true;
    lapListDisplay.innerHTML = "";
}

function recordLapTime() {
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    let lapTime = formatTime(hours, minutes, seconds);
    lapList.push(`Lap ${lapCount}: ${lapTime}`);
    
    let lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapListDisplay.appendChild(lapItem);
    
    lapCount++;
}

startStopBtn.addEventListener("click", startStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLapTime);
