var net     = require('net')
var sockets = {}

var server = net.createServer(function (socket) {
  var id = socket.remoteAddress + ':' + socket.remotePort
  sockets[id] = socket

  socket.on('end', function () {
    delete sockets[id]
  })

  socket.on('data', function (data) {
    msg('<' + id + '> ' + data)
  })

  msg('* ' + id + ' joined the chat')
})

function msg (msg) {
  Object.keys(sockets).forEach(function (peer) {
    try {
      sockets[peer].write(msg.replace(/(\r\n)+/g, '') + '\n')
    } catch (e) {}
  })
}

server.listen(1337)