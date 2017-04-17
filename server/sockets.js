const xxh = require('xxhashjs'); // fast hashing for keeping track of players

const Car = require('./car.js');

let io;

const roomsObj = {};
/*
  roomsObj{
    room2{
      socket1: {host: true, color: blue, ready: true},
      socket2: {host: false, color: poop},
    },
    room1{
      socket1: {host: true, color: blue},
      socket2: {host: false, color: poop},
    }
  }
*/

/*
    my name is murl
    and wen its nite
    I stay up late
    and end my life
    i have fun time
    with no work
    this meme is mine
    the powerpuff girls can really twerk
    
    -by Ryan don't call me steven ma Spencer
*/
const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'cyan'];

const confirmHost = (sock) => {
  const socket = sock;
  socket.isHost = true;
  socket.hostSocket = socket;

  console.log(`${socket.hash} is host`);

  socket.on('hostUpdatedMovement', (data) => {
    socket.broadcast.to(socket.room).emit('updatedMovement', data);
  });

  socket.emit('hostConfirm');
};

const updateJoinableRoomsS = () => {
  const keys = Object.keys(roomsObj);
  if (!keys || keys.length === 0) {
    const data = {
      message: '<p>There are no active battles at the moment.<br />Start your own battle!</p>',
    };
    io.emit('updateJoinableRoomsC', data);// (do a check for gamestate in client, only display if not in game/looking for room)
  } else {
    // send a list of all of the current rooms available to join and
    // how many people are in each room
    console.dir(roomsObj);
    io.emit('updateJoinableRoomsC', roomsObj);// (do a check for gamestate in client, only display of not in game/looking for room)
  }
};

const updateRoomStatusS = (socket) => {
  // update for users who are in room/game
  //send them back the roomsObj object for just their room
  const socketRoom = roomsObj[socket.room];
  //console.dir(socketRoom);
  io.sockets.in(socket.room).emit('updateRoomStatusC', { roomName: socket.room, roomObj: socketRoom });
};

const configureSocket = (sock, data) => {
  const socket = sock;

  console.log(`data.roomName: ${data.roomName}`);
  // make a unique hash to give to the socket and to the car constructor
  const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xDADFACE).toString(16);
  /*
    DADFACE BADFABDADCAD FABDADDEDFED CADBABDADFAD BADFADDADAAD ADDADDADBADAAAAA
    DADFEDDEADBEEF 5ADDABDADFAD 7ADDABFAD D00DDADNEEDBAD 420DAD5AD
  */
  socket.hash = hash;

  // create car
  const car = new Car(hash);

  // get an array of all the sockets in the room
  const socketRoom = io.sockets.adapter.rooms[data.roomName];


  if (!socketRoom || socketRoom.length === 0) {
    // add this room to the roomsObj
    roomsObj[data.roomName] = {}; // .hash = {host: true};
    roomsObj[data.roomName][hash] = { host: true };
    confirmHost(socket);
  } else if (socketRoom.length >= 8) {
    console.log('Room is Full. Already has 8 Players.');
    return;
  } else {
    socket.isHost = false;
    // add this room to the roomsObj
    // roomsObj[data.roomName] = {hash:{host:false}};
    roomsObj[data.roomName][hash] = { host: false };
    const socketKeys = Object.keys(socketRoom.sockets);
    let hostFound = false;

    for (let i = 0; i < socketKeys.length; i++) {
      const socketUser = io.sockets.connected[socketKeys[i]];

      if (socketUser.isHost) {
        socket.hostSocket = socketUser;
        socket.hostSocket.emit('hostAcknowledge', car);
        hostFound = true;
        break;
      }
    }
    if (!hostFound) {
      confirmHost(socket);
    }
  }

  car.fillStyle = colors[Object.keys(roomsObj[data.roomName]).length - 1];
  roomsObj[data.roomName][hash].color = car.fillStyle;
  // client sends the name of the room they want to join
  // if room does not exist make them host
  
  // if rooms is full just tell them*******************->STILL NEED TO DO THIS
  
  // if room exists and has room just add them as not host. tell them who host is

  // send to client
  // we want the right side form to show
  // whos the host
  // how many people there are
  // host should have a start button
  // everyone else could have "ready to fight buttons"

  console.log(`${socket.hash} has joined`);

  //* *****************************************
  socket.room = data.roomName;
  socket.join(data.roomName);
  socket.emit('joined', car);

  // update everyones list of rooms yey
  updateJoinableRoomsS();
  updateRoomStatusS(socket);
};

const handleMovement = (socket, dataObj) => {
  if (socket.isHost) {
    return;
  }

  const data = dataObj;
  data.hash = socket.hash;

  socket.hostSocket.emit('movementUpdate', data);
};

const handleDisconnect = (socket) => {
  console.log(`${socket.hash} has left`);
  io.sockets.in(socket.room).emit('left', socket.hash);

  socket.leave(socket.room);

  const socketRoom = io.sockets.adapter.rooms[socket.room];
  if (roomsObj[socket.room]) delete roomsObj[socket.room][socket.hash];
  updateJoinableRoomsS();
  updateRoomStatusS(socket);
  
    
  if (socket.isHost && socketRoom) {
    io.sockets.in(socket.room).emit('hostLeft');

    const socketKeys = Object.keys(socketRoom.sockets);
     
    for (let i = 0; i < socketKeys.length; i++) {
      const socketList = io.sockets.connected;
      socketList[socketKeys[i]].disconnect();
    }
    console.log(roomsObj[socket.room]);
    delete roomsObj[socket.room];
    updateJoinableRoomsS();
  }
  else if (socket.isHost) {
      console.log(roomsObj[socket.room]);
      delete roomsObj[socket.room];
      updateJoinableRoomsS();
  }
};


const setupSockets = (ioServer) => {
  io = ioServer;

  io.on('connection', (sock) => {
    const socket = sock;

    updateJoinableRoomsS(socket);

    socket.on('onJoin', data => configureSocket(socket, data));

    socket.on('movementUpdate', data => handleMovement(socket, data));


    socket.on('disconnect', data => handleDisconnect(socket, data));
  });
};

module.exports.setupSockets = setupSockets;
