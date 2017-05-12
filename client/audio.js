let music = true;
let menuMusicEle;
let gameMusicEle;

const playMenuMusic = () => {
  menuMusicEle.play();
  gameMusicEle.pause();
}

const playGameMusic = () => {
  menuMusicEle.pause();
  gameMusicEle.play();
}

const toggleMusic = () => {
  console.log("toggling music");
  
  if(music){
    //mute music
    menuMusicEle.muted = true;
    gameMusicEle.muted = true;
    
    
    music = false;
  }else{
    //unmute music
    menuMusicEle.muted = false;
    gameMusicEle.muted = false;
    
    
    music = true;
  }
}

const audioInit = () => {
  //get audio eles
  menuMusicEle = document.querySelector("#menuAudio");
  gameMusicEle = document.querySelector("#gameAudio");

  //start the music
  playMenuMusic();
  
  document.querySelector("#audioButton").onclick = () =>{
    toggleMusic();
  }
}