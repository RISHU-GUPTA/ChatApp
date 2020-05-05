const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMsg=require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// const userName="Bot";

// Run when client connects
io.on('connection', socket => {

  socket.on('join',({username})=>{
 // Welcome current user
 socket.emit('message',formatMsg('Bot',`${username} Welcome to chat App`));

 // Broadcast when a user connects
socket.broadcast.emit('message',formatMsg('Bot',`${username}  has joined the chat...`));

//send personal message
socket.join(username);

 // Runs when client disconnects
socket.on('disconnect',()=>{
  io.emit('message',formatMsg('Bot',`${username} has left the chat...`));
})
  })


// Listen for chatMessage
socket.on('chatMessage',({msg,user})=>{
  console.log(msg);
  if(msg.includes("@")){
    let firstIndex=msg.indexOf("@");
    let lastIndex=msg.indexOf(" ");
    let username=msg.substring(firstIndex+1,lastIndex);
   // msg=msg.substring(msg.indexOf("@") + str.indexOf(" "));
    io.in(username).emit('new_msg', formatMsg(username,msg));

  }else{
    io.emit('message',formatMsg(user,msg));
  }
 
})




})
   

   
   

    // Send users and room info


  
 

 


const PORT = process.env.PORT || 9000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));