let WIDTH = 1280; 
let HEIGHT= 720;
let canvas= undefined;
let ctx = undefined;
let socket; 
let hash;
let isHost = false;
let animationFrame;
const bgImage = new Image();
const redSprite = new Image();
const orangeSprite = new Image();
const greenSprite = new Image();
const yellowSprite = new Image();
const purpleSprite = new Image();
const lightBlueSprite = new Image();
const pinkSprite = new Image();
const tealSprite = new Image();



const avatars = {
  red: redSprite,
  orangered: orangeSprite,
  green: greenSprite,
  yellow: yellowSprite,
  purple: purpleSprite,
  royalblue: lightBlueSprite,
  pink: pinkSprite,
  teal: tealSprite
};
const directions = {
  DOWNRIGHT: 0, 
  DOWNLEFT: 1,
  UPRIGHT: 2,
  UPLEFT: 3,
};
let hosted = {};
//The Various Game States and Car States
const GAME_STATE = Object.freeze({
  BEGIN: 0,
  STORY: 1,
  CHOOSEROOM: 2,
  WAITING: 3,
  INGAME: 4,
  TACTICS: 5,
  DEFAULT: 6,
  ROUND_END: 7,
  END: 8,
  LOBBY: 9,
});

//Object at center of the screen
const sun = Object.seal({
  x: 0,
  y: 0,
  size: 100,
  core: 30,
  pull: 4,
});

//Active gamestate
let gameState = undefined;

//Array of car
let cars = {};


const keyDownHandler = (e) => {
  var keyPressed = e.which;
  const car = cars[hash];

  // W OR UP
  if(keyPressed === 87 || keyPressed === 38) {
    car.moveUp = true;
    e.preventDefault();//keeps page from scrolling when arrows
  }
  // A OR LEFT
  else if(keyPressed === 65 || keyPressed === 37) {
    car.moveLeft = true;
    e.preventDefault();
  }
  // S OR DOWN
  else if(keyPressed === 83 || keyPressed === 40) {
    car.moveDown = true;
    e.preventDefault();
  }
  // D OR RIGHT
  else if(keyPressed === 68 || keyPressed === 39) {
    car.moveRight = true;
    e.preventDefault();
  }

  return false;
};

const keyUpHandler = (e) => {
  var keyPressed = e.which;
  const car = cars[hash];

  // W OR UP
  if(keyPressed === 87 || keyPressed === 38) {
    car.moveUp = false;
  }
  // A OR LEFT
  else if(keyPressed === 65 || keyPressed === 37) {
    car.moveLeft = false;
  }
  // S OR DOWN
  else if(keyPressed === 83 || keyPressed === 40) {
    car.moveDown = false;
  }
  // D OR RIGHT
  else if(keyPressed === 68 || keyPressed === 39) {
    car.moveRight = false;
  }

  return false;
};

const eventHandler =() =>{
  //set up keys
  document.body.addEventListener('keydown', keyDownHandler);
  document.body.addEventListener('keyup', keyUpHandler);

  //set up host button
  const hostButton = document.querySelector("#hostButton");
  hostButton.addEventListener('click', (e)=>{
    console.log(`clicked host battle, roomName: ${document.querySelector("#hostName").value}`);
    onJoin(document.querySelector("#hostName").value);
  });
};

const updateJoinableRoomsC = (data) =>{
  if(gameState === GAME_STATE.CHOOSEROOM){
    const battleList = document.querySelector("#battleList");
    console.log('In updateJoinableRoomsC')
    console.dir(data);
    battleList.innerHTML = "";    
    if(data.message){
      battleList.innerHTML = data.message;
    }else{
      const keys = Object.keys(data);
      for(let i = 0; i < keys.length; i++){

        console.log(data[keys[i]]);
        if(!data[keys[i]].inGame){
          const numInRoom = Object.keys(data[keys[i]]).length;
          console.log(Object.keys(data[keys[i]]));

          //create button for each existing room 
          const roomButton = document.createElement('input');

          roomButton.setAttribute('class', 'button');
          roomButton.setAttribute('type', 'button');
          roomButton.setAttribute('value', `${keys[i]}(${numInRoom}/8)`);

          //add a click event that will add them to the room
          roomButton.addEventListener('click', (e)=>{
            console.log("clicked a battle to join");
            onJoin(keys[i]);
          });

          //append it to battleList
          battleList.appendChild(roomButton);
        }

      }
      
      if(battleList.innerHTML === ''){
        battleList.innerHTML = '<p>There are no active battles at the moment.<br />Start your own battle!</p>';
      }
    }
  }
};

const updateRoomStatusC = (data) =>{
  if(gameState === GAME_STATE.WAITING || gameState === GAME_STATE.LOBBY || gameState === GAME_STATE.INGAME){

    console.log(`In updateRoomStatusC IF`);
    console.dir(data);

    const roomSetupDiv = document.querySelector("#roomSetup");
    roomSetupDiv.innerHTML = `<h2><em>Battle of</br>${data.roomName}</em></h2>`;

    roomSetupDiv.innerHTML += `<input id="leaveButton" class="button" type="button" value="Leave Room">`;

    //start button for host
    if(isHost){
      roomSetupDiv.innerHTML += `<input id="startButton" class="button" type="button" value="Start the Game">`;

      const startButton = document.querySelector("#startButton");
      console.log("button clicked");  

      startButton.addEventListener('click', (e)=>{
        console.log("button clicked");  

        if (Object.keys(data.roomObj).length < 4) {
          startButton.value = "Must have at least 4 players";
          setTimeout(() => {
            startButton.value = "Start the Game";
          }, 1500);
        }
        else {
          console.log('host clicked start');
          socket.emit('hostStart');
          roomSetupDiv.removeChild(startButton);
        }
      });
    }

    document.querySelector("#leaveButton").onclick = leaveRoom;

    const keys = Object.keys(data.roomObj);
    for(let i = 0; i < keys.length; i++){

      const currentSocket = data.roomObj[keys[i]];
      console.log(`currentSocket: ${currentSocket}`);

      const playerAvatar = document.createElement("div");
      roomSetupDiv.appendChild(playerAvatar);

      playerAvatar.style.backgroundColor = currentSocket.color;

      if(currentSocket.host){
        playerAvatar.innerHTML += "<p id='host'>Host</p>";
      }
      playerAvatar.setAttribute("class","playerAvatar");
      
      const avatarImg = document.createElement("div");
      avatarImg.appendChild(avatars[currentSocket.color]);
      avatarImg.setAttribute("class", "avatarImg" );
      roomSetupDiv.appendChild(avatarImg);
    }
  }
};

const hostStart = () =>{
  gameState = GAME_STATE.INGAME;
  playGameMusic();
};

const endGame = () =>{
  gameState = GAME_STATE.END;

  playMenuMusic();
};

const onJoin = (roomName) =>{
  socket.emit('onJoin', {roomName: roomName});
  gameState = GAME_STATE.LOBBY;
  socket.on('hostConfirm', confirmHost);
  socket.on('joined', setUser);
  socket.on('updateRoomStatusC', updateRoomStatusC);
  socket.on('updatedMovement', update);
  socket.on('left', removeUser);
  socket.on('hostLeft', hostLeft);
  socket.on('hostStart', hostStart);
  socket.on('endGame', endGame);
  socket.on('updateHealth',health);  
};

const leaveRoom = () =>{

  location.reload();

  //  console.log("in leave room");
  //
  //  const roomSetupEle = document.querySelector("#roomSetup");
  //
  //  roomSetupEle.innerHTML =  '<div id="hostRoomDiv">';
  //  roomSetupEle.innerHTML += '<label for="hostRoom">Start a Battle: </label><br />';
  //  roomSetupEle.innerHTML += '<input id="hostName" name="hostRoom" type="text" placeholder="Battle Name">';
  //  roomSetupEle.innerHTML += '<input id="hostButton" class="button" type="button" value="Begin!">';
  //  roomSetupEle.innerHTML += '</div>';
  //  roomSetupEle.innerHTML += '<br />';
  //  roomSetupEle.innerHTML += '<div id="joinRoomDiv">';
  //  roomSetupEle.innerHTML += '<label for="joinRoom">Join a Battle: </label><br />';
  //  roomSetupEle.innerHTML += '<div id="battleList">';
  //
  //  socket.emit('dc');
  //  cancelAnimationFrame(animationFrame);
  //
  //  init();

}

//Opening function
const init = () => {
  audioInit();

  //Create and access canvas
  canvas = document.querySelector('canvas');

  ctx = canvas.getContext('2d');

  //Set overall canvas size
  canvas.height = HEIGHT;//window.innerHeight * .979;
  canvas.width = WIDTH//window.innerWidth * .99;   

  //Sun should be center
  sun.x = canvas.width / 2;
  sun.y = canvas.height / 2;

  //set backgroundImage
  bgImage.src = "./assets/media/background.jpg";
  //SOURCE -> https://pixabay.com/en/star-points-stains-effect-space-1626550/

  //load in sprites 
  orangeSprite.src = "./assets/media/orangeSprite.png";
  redSprite.src = "./assets/media/redSprite.png";
  greenSprite.src = "./assets/media/greenSprite.png";
  yellowSprite.src = "./assets/media/yellowSprite.png";
  purpleSprite.src = "./assets/media/purpleSprite.png";
  lightBlueSprite.src = "./assets/media/lightBlueSprite.png";
  pinkSprite.src = "./assets/media/pinkSprite.png";
  tealSprite.src = "./assets/media/tealSprite.png";


  drawIntroScreen();
  eventHandler();

  socket = io.connect();

  gameState = GAME_STATE.CHOOSEROOM;

  socket.on('updateJoinableRoomsC', updateJoinableRoomsC);

};

window.onload = init;
