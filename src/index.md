
# Learn You The Node.js<br>*For Much Win*

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## What is Node.js?

### A simple platform for writing
### &nbsp;&nbsp;&nbsp;&nbsp;&hellip; network-centric
### &nbsp;&nbsp;&nbsp;&nbsp;&hellip; JavaScript applications
### &nbsp;&nbsp;&nbsp;&nbsp;&hellip; using event-driven, non-blocking I/O

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## For writing applications

Target platforms:

  * OSX
  * Linux
  * Solaris
  * Windows

Also: *BSD, Linux variants & ARM: Raspberry Pi, BeagleBone, Kindle, webOS

*And Browserify*

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## JavaScript

V8 (Chrome)

Single runtime target

Many familiar extras:

```js
console.log()  // info, warn, error, dir,
               // time, timeEnd, trace, assert

setTimeout()   // setInterval, setImmediate

JSON           // of course
```

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Network-centric

Node core:

 * &frac14; platform
 * &frac14; dev support
 * &frac14; abstractions, OS, libs & filesystem
 * **&frac14; networking**

TCP, UDP, HTTP, HTTPS, TLS, SSL, URLs, query strings

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Event-driven, non-blocking I/O

Reactionary: callbacks & events everywhere. **Call Me Maybe**.

First-class functions FTW!

```js
// callbacks
fs.readFile('data.txt', 'utf8', function (err, data) {
  var lines = data.split('\n').length
  console.log(lines + ' lines')
})

// events
server.on('connection', function (stream) {
  console.log('someone connected!')
})
```

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Event-driven, non-blocking I/O

**Scalability**: kernel-level non-blocking socket I/O:<br><b><code>epoll</code></b> or <b><code>select</code></b>

**Concurrent**: worker threads for file I/O

JavaScript thread only needs to block for JavaScript!

*Unless you tell it otherwise*

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Event-driven, non-blocking I/O

```js
// Synchronous (avoid this)
console.log('Reading file...')
var data = fs.readFileSync('data.txt', 'utf8')
var lines = data.split('\n').length
console.log(lines + ' lines')
```

```js
// Asynchronous (embrace this)
fs.readFile('data.txt', 'utf8', function (err, data) {
  var lines = data.split('\n').length
  console.log(lines + ' lines')
})
console.log('Reading file...')
```

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

<table cellpadding=0 cellspacing=0 style="border-collapse: collapse; margin: 20px auto;">
  <tr>
    <td style="border-bottom: dashed 2px rgb(134,136,118); padding: 2em; text-align: center;">JavaScript</td>
    <td style="border: solid 2px rgb(134,136,118); background-color: rgb(245,245,244); padding: 2em; text-align: center;" colspan=4>Node core library</td>
    <td style="border-bottom: dashed 2px rgb(134,136,118); padding: 0.5em;">&nbsp;</td>
  </tr>
  <tr>
    <td style="padding: 2em; text-align: center;" rowspan=2>C / C++</td>
    <td style="border: solid 2px rgb(134,136,118); padding: 2em; text-align: center;" colspan=4>Node bindings</td>
  </tr>
  <tr>
    <td style="border: solid 2px rgb(134,136,118); padding: 1em; text-align: center;">
      **V8**
    </td>
    <td style="border: solid 2px rgb(134,136,118); padding: 1em; text-align: center;">
      **libuv**
    </td>
    <td style="border: solid 2px rgb(134,136,118); padding: 1em; text-align: center;">
      *OpenSSL<br>zlib<br>http_parser<br>cares*
    </td>
  </tr>
</table>

<p style="font-size: 8px;">Original version of this table by Bert Belder: http://www.youtube.com/watch?v=nGn60vDSxQ4</p>

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## libuv and the event loop

<!-- <img src="img/eventloop1.gif" width="50%" height="50%"> -->
<!-- http://nodejsreactions.tumblr.com/post/53202934359/the-event-loop -->

<table style="margin: 0 auto 20px auto;">
  <tr>
    <td colspan=3 style="border-bottom: dashed 2px rgb(134,136,118); padding: 1em; text-align: center;">
      **JavaScript callbacks**
    </td>
  </tr>
  <tr>
    <td style="text-align: center; padding: 0.5em;">Timers</td>
    <td style="text-align: center; padding: 0.5em;">
      <img src="img/eventloop2.gif" width="244" height="129" style="box-shadow: 0 0 20px rgba(0, 0, 0, 0.6); border-radius: 70px;">
    </td>
    <td style="text-align: center; padding: 0.5em;">Sleep?</td>
  </tr>
  <tr>
    <td style="text-align: center; padding: 0.5em;">Socket I/O</td>
    <td style="text-align: center; padding: 0.5em;">Filesystem I/O</td>
    <td style="text-align: center; padding: 0.5em;">OS events</td>
  </tr>
</table>

<p style="font-size: 8px;">GIF analogy credit: http://nodejsreactions.tumblr.com/post/56979518608/the-node-js-event-loop</p>

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## npm - the Node Package Manager

<img src="img/npm.png" height="50" width="129" style="margin: 0 auto; display: block;">

Makes publishing and using packages a breeze

Minimises dependency and version conflicts

Ease and simplicity of reuse has encouraged a culture of ***extreme modularity***

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

<img src="img/package-growth-comparison.png" height="223" width="450" style="margin: 50px auto 0 auto; display: block;">

<p style="font-size: 12px;">Packages per day across popular platforms (source: www.modulecounts.com)</p>

<p style="font-size: 8px;">Chart credit: http://blog.nodejitsu.com/npm-innovation-through-modularity</p>

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

```js
var net     = require('net')
var sockets = {}
var server  = net.createServer(function (socket) {
  var id = socket.remoteAddress + ':' + socket.remotePort
  sockets[id] = socket
  socket.on('end', function () { delete sockets[id] })
  socket.on('data', function (data) {
    msg('<' + id + '> ' + data)
  })
  msg('* ' + id + ' joined the chat')
})
function msg (msg) {
  Object.keys(sockets).forEach(function (p) {
    try { sockets[p].write(msg.replace(/(\r?\n)+/g, '') + '\n') } catch (e) {}
  })
}
server.listen(1337)
```
