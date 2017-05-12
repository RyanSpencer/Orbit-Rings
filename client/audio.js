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

  const sound = document.querySelector("#sound");
  const mute = document.querySelector("#mute");

  if(music){
    //mute music
    menuMusicEle.muted = true;
    gameMusicEle.muted = true;

    music = false;

    sound.style.display = "none";
    mute.style.display = "block";

  }else{
    //unmute music
    menuMusicEle.muted = false;
    gameMusicEle.muted = false;

    music = true;

    sound.style.display = "block";
    mute.style.display = "none";
  }
}

const audioInit = () => {
  //get audio eles
  menuMusicEle = document.querySelector("#menuAudio");
  gameMusicEle = document.querySelector("#gameAudio");

  //start the music
  playMenuMusic();

  document.querySelector("#audioButton").addEventListener('click', () =>{
    toggleMusic();
  });
}