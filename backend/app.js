const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const io = require('socket.io')(server);
const cors = require('cors');
const mongoose = require('mongoose');

let users = [];

// FOR STATIC FILES
app.use(express.static(__dirname+'/public'));

// CONNECT MONGO
mongoose.connect("mongodb://127.0.0.1:27017/scotch-chat");

// ALLOW CORS
app.use(cors());


// ROUTES START
app.get('/',function (req, res) {
  res.sendfile('index.html');
})

// ROUTE END


io.on("connection", socket => {

  socket.on('join',function (data) {

    // JOIN THE ROOM
    socket.join(data.room);

    console.log(data.user+ ' Joined the room '+data.room);

    socket.broadcast.to(data.room).emit('New user joined',{"user":data.user, "message":'Has joined this room'});
  })

  socket.on('leave',function (data) {

    console.log(data.user+ ' left the room '+data.room);

    socket.broadcast.to(data.room).emit('leave room',{"user":data.user, "message":'Has left this room'});

    socket.leave(data.room);
  });

  socket.on('message',function(data){
    io.in(data.room).emit('new message',{"user":data.user, "message":data.message});
  })

  /***********************************/
  socket.on('newUser',function(data){

    users.push({
      'user':data.user,
      'id': socket.id
    })

    console.log(users);
    io.emit('userList',users);
  });

  socket.on('getUserList',function(){
    io.emit('userList',users);
  })

  socket.on('msg',function(data){
    console.log(data);
    io.in(data.id).emit('nmsg',{"user":data.user, "message":data.message});
  })
});

/**
 *
 * SETTING PORT
 *
 */
server.listen(3000, ()=>{
  console.log('Server is running on port 3000');
})
