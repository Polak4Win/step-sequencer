
// Main Class

class drumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play-button");
        this.selects = document.querySelectorAll("select");
        this.muteBtns = document.querySelectorAll(".mute-button");
        this.tempoSlider = document.querySelector(".BPM-slider");
        this.kickAudio = document.querySelector(".kick-audio");
        this.snareAudio = document.querySelector(".snare-audio");
        this.hihatAudio = document.querySelector(".hihat-audio");
        this.loopAudio = document.querySelector(".loop-audio");
        this.currentKick = ".\audio\kick\Kick Boom-Bap.wav";
        this.currentSnare = ".\audio\snare-clap\FTDK Snare 1.wav";
        this.currentHihat = ".\audio\cymbals\FTDK Hat 10.wav";
        this.currentLoop = ".\audio\loops\bass-bpm84-1.wav";
        this.index = 0;
        this.bpm = 84;
        this.isPlaying = null;
    }

    activePad(){
        this.classList.toggle("active");
    }

    repeat(){
        let step = this.index % 16;
        const activeBars = document.querySelectorAll(`.a${step}`);
        //  loop over the pads
        activeBars.forEach(bar => {
            bar.classList.toggle("playing");
            //check if pads are active
            if (bar.classList.contains("active")){
                // check which sound
                if (bar.classList.contains("snare")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("kick")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("hihat")){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
                if (bar.classList.contains("loop")){
                    this.loopAudio.currentTime = 0;
                    this.loopAudio.play();
                }
            } 
            sleep((15/this.bpm)*1000).then(() => {
                bar.classList.toggle("playing");
            });
            
        });
        
        this.index++;
    }

    start(){
        const interval = (15/this.bpm)*1000;
        // check if its playing
        if(!this.isPlaying){
            this.isPlaying = setInterval(()=>{
                this.repeat();
            },interval);    
        } else {
            // clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.index = 0
        }
    }

    updatebtn(){
        const btntext = document.querySelector(".text-block");
        const btnicon = document.querySelector(".play-icon");
        if(!this.isPlaying){
            btntext.innerText = "Play";
            this.playBtn.classList.remove("active");

        } else {
            btntext.innerText = "Stop";
            this.playBtn.classList.add("active");
            
        }

    }

    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        console.log(selectionValue);
        switch(selectionName){
            case "kick":
                this.kickAudio.src = selectionValue;
                break;
            case "snare":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat":
                this.hihatAudio.src = selectionValue;
                break;
            case "loop":
                this.loopAudio.src = selectionValue;
                break;
        }

    }

    mute(e){
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
                case "3":
                    this.loopAudio.volume = 0;
                    break;

            }
            console.log(muteIndex);
        }else{
            switch(muteIndex){
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
                case "3":
                    this.loopAudio.volume = 1;
                    break;
            }
        }
    }

    changeTempo(e){
        const tempotext = document.querySelector(".p-BPM");
        this.bpm = e.target.value;
        tempotext.innerText = `${e.target.value} BPM`;
    }

    updateTempo(){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        if(this.playBtn.classList.contains('active')){
            this.start();
        }

    }

}

//event Listeners


const drumkit = new drumKit

drumkit.pads.forEach(pad => {
    pad.addEventListener("click",drumkit.activePad);
});

drumkit.playBtn.addEventListener("click",()=>{
    drumkit.start();
    drumkit.updatebtn();
})


drumkit.selects.forEach(select => {
    select.addEventListener("change",function(e){
        drumkit.changeSound(e);
    })
});

drumkit.muteBtns.forEach(btn => {
    btn.addEventListener("click",function(e){
        drumkit.mute(e);
    })
});

drumkit.tempoSlider.addEventListener("input",function(e){
    drumkit.changeTempo(e);
})

drumkit.tempoSlider.addEventListener("change",function(){
    drumkit.updateTempo();
})

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

