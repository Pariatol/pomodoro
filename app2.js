const breakDecrement = document.getElementById('break-decrement');
const breakIncrement = document.getElementById('break-increment');
const sessionDecrement = document.getElementById('session-decrement');
const sessionIncrement = document.getElementById('session-increment');

const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');

const startStop = document.getElementById('start_stop');
const reset = document.getElementById('reset');
const timeLeft = document.getElementById('time-left');
const timerLabel = document.getElementById('timer-label');

let start = false;

breakDecrement.addEventListener('click', e=>{
    if(!start){
        breakLength.innerText!=="1"?
        breakLength.innerText = parseInt(breakLength.innerText) -1
        :null;
    }
})

breakIncrement.addEventListener('click', e=>{
    if(!start){
        breakLength.innerText!=="60"?
        breakLength.innerText = parseInt(breakLength.innerText) +1
        :null;
    }
})

sessionDecrement.addEventListener('click', e=>{
    if(!start){
        sessionLength.innerText!=="1"?
        sessionLength.innerText = parseInt(sessionLength.innerText) -1
        :null;
        timeLeft.innerText = `${sessionLength.innerText}:00`;
    }
})

sessionIncrement.addEventListener('click', e=>{
    if(!start){
        sessionLength.innerText!=="60"?
        sessionLength.innerText = parseInt(sessionLength.innerText) +1
        :null;
        timeLeft.innerText = `${sessionLength.innerText}:00`;
    }
})


startStop.addEventListener('click', e=>{
    console.log('class when click startstop : '+timeLeft.classList.value)
    timeLeft.classList.value === ""?timeLeft.classList.add('session'):null;

    let minutes = parseInt(timeLeft.innerText[0]+timeLeft.innerText[1]);
    let seconds = parseInt(timeLeft.innerText[3]+timeLeft.innerText[4]);
    let totalSeconds = minutes*60 + seconds;
    
    start = !start;
    
    let lapin = setInterval(()=>{

        if(totalSeconds>0 && start){ // ça marche !!!
        totalSeconds = totalSeconds -1;
        let minutesToPrint = Math.floor(totalSeconds/60);
        let secondsToPrint = totalSeconds-Math.floor(totalSeconds/60)*60;
        timeLeft.innerText = `${minutesToPrint<10?'0'+minutesToPrint:minutesToPrint}:${secondsToPrint<10?'0'+secondsToPrint:secondsToPrint}`;
        console.log(totalSeconds);

            if(totalSeconds===4){
                let beep = new Audio("./beep.mp3");
                beep.play(); 
            }

    } else if(totalSeconds === 0 && start){

        timeLeft.classList.value === "session"?timeLeft.classList.value = "break":timeLeft.classList.value = "session";

        timeLeft.classList.value === "break"?timeLeft.innerText = `${breakLength.innerText}:00`:timeLeft.innerText = `${sessionLength.innerText}:00`

        if(timeLeft.classList.value === "session") timerLabel.innerText = "Session";
        if(timeLeft.classList.value === "break") timerLabel.innerText = "Break";
        
        let minutes = parseInt(timeLeft.innerText[0]+timeLeft.innerText[1]);
        let seconds = parseInt(timeLeft.innerText[3]+timeLeft.innerText[4]);
        totalSeconds = minutes*60 + seconds;


    } else {
        clearInterval(lapin);
        return;
    }
    },1000)
    return;
})

reset.addEventListener('click',(e)=>{
    if(start === true){ 
        start = false;
    }
    if(timeLeft.classList.value === "break") timeLeft.classList.value = "session";
    if(timerLabel.innerText === "Break") timerLabel.innerText = "Session";
    timeLeft.innerText = `${25}:${0}0`;
    sessionLength.innerText = 25;
    breakLength.innerText = 5;
})