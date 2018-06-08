var socket = io.connect('http://http://185.13.90.140:8081/');

var output = document.getElementById('output');
var user = document.getElementById('user');
var message = document.getElementById('message');
var btn = document.getElementById('send');
var feedback = document.getElementById('feedback');

btn.addEventListener('click', emitChat);

message.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      emitChat();
    }
});

message.addEventListener('keypress', function(){
    socket.emit('typing', user.value);
});

socket.on('message', function(data){
    feedback.innerHTML = '';
    if (data.user == user.value){
        output.innerHTML += '<p class="self">' + data.message + '</p>';
    }else{
        output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
    }
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
});

function emitChat(){
    socket.emit('message', {
        message: message.value,
        user: user.value
    });
    message.value = '';
}