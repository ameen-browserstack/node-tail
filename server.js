var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var initial_file = fs.readFileSync(process.argv[2]);
  socket.emit('initial_file',initial_file.toString());
  var position = initial_file.length;
  fs.watch(process.argv[2], function(curr,prev) {
    fs.open(process.argv[2], 'r', function(err, fd) {
      fs.fstat(fd,function(err,stats) {
        var bufferSize = stats.size - position;
        if (bufferSize > 0) {
          var buffer = new Buffer(bufferSize);
          fs.readSync(fd, buffer, 0, bufferSize, position);
          var arr = buffer.toString('utf8',0,bufferSize).split('\n');
          for (var i=0;i<arr.length;i++) {
            if (arr[i].length > 0)
              socket.emit('update',arr[i]);
          }
        }
        position = stats.size;
      });
    });
  });
});


http.listen(3000, function(){
  console.log('Listening on port 3000');
});
