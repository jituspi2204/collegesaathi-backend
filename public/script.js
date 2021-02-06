const socket = io();
var box = document.getElementById('message');
var button = document.getElementById('button');


socket.on('getLocation', (message) => {
    console.log(message);
    socket.emit('join', 110075);
    socket.on('provideLocation', () => {
        socket.emit('location',  {lat : 28.4344,lng : 74.32343});
    })
})

