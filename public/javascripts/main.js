const chartForm=document.querySelector("#chat-form");
const chatMessages = document.querySelector('.chat-messages');

//get username
const {username}= Qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const socket=io();

  console.log(username);
  //create room and join
  socket.emit('join', {username: username});



//message coming from server
socket.on('message',mes=>{
    console.log(mes);
    outputMessage(mes);

      // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

//to primate message
socket.on("new_msg", mes=> {
    outputMessage(mes);
         // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


//submit message
chartForm.addEventListener('submit',e=>{
    e.preventDefault();
    //get message text
    const msg=e.target.elements.msg.value;
    console.log(msg);
    //emit msg to server
    socket.emit('chatMessage',{msg:msg,user:username});

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//display server message to DOM
function outputMessage(msg){
    const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${msg.username} <span>${msg.time}</span></p>
  <p class="text">
    ${msg.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}