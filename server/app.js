const http = require('http'); // Required to make a server
const path = require('path'); // Alows us to help direct them to hosted
const express = require('express'); // Used to host our hosted folder
const socketio = require('socket.io'); // Sockets
const sockets = require('./sockets.js'); // Our sockets file

const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

// Create a new express app
const app = express();
// The assets folder will be hosted
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));

// Whenver some goes to the webpage send them to index
app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../hosted/index.html`));
});


// Create our server
const server = http.createServer(app);

// Send our sockets to the sockets.js file
const io = socketio(server);
sockets.setupSockets(io);

// start listening
server.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${PORT}`);
});
