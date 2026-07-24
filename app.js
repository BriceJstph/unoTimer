const buzzer = document.getElementById("buzzer");
const timeToPlay = document.getElementById("timeToPlayInput");
const reset = document.getElementById("reset");
const audioTick = new Audio("media/tick.mp3");
const audioFail = new Audio("media/fail.mp3");

var timer = null;
const delay = 1100;


function updateBuzzColor(){
    let hslPercentage = Math.floor((buzzer.textContent / timeToPlay.value) * 110);    
    buzzer.style.backgroundColor = `hsl(${hslPercentage}, 100%, 40%)`;
}


function lowerTime(){
    buzzer.textContent = buzzer.textContent - 1;

    updateBuzzColor();

    if(buzzer.textContent == 0){
        audioFail.play()
        console.log("END")
    }else{
        audioTick.play();
        timer = setTimeout(lowerTime,delay);
    }
}

function handleTap(event){
    if(buzzer.textContent == 0) return;

    buzzer.textContent = timeToPlay.value
    updateBuzzColor();
    
    if(timer != null) clearTimeout(timer);
    audioTick.play();
    timer = setTimeout(lowerTime,delay);
}

function handleReset(event){
    buzzer.textContent = timeToPlay.value
    if(timer != null) clearTimeout(timer);
    updateBuzzColor();
}

buzzer.addEventListener("click",handleTap);
reset.addEventListener("click",handleReset);
