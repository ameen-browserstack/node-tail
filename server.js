var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.emit('initial_file',fs.readFileSync(process.argv[2]).toString());
  fs.watch(__dirname+"/inp",function(c,p) {
    data = fs.readFileSync(process.argv[2]).toString().split('\n');
    lastLine = data[data.length-1];
    socket.emit('update',lastLine);
  });

});

http.listen(3000, function(){
  console.log('Listening on port 3000');
});
