
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

```js
// callbacks
fs.readFile('data.txt', function (err, data) {
  var lines = data.toString().split('\n').length
  console.log(lines + ' lines')
})

// events
server.on('connection', function (stream) {
  console.log('someone connected!')
})
```

First-class functions FTW!

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Event-driven, non-blocking I/O

**Scalability**: kernel <b><code>epoll</code></b> or <b><code>select</code></b> for socket I/O

**Concurrent**: worker threads for file I/O

JavaScript thread only needs to block for JavaScript!

*Unless you tell it otherwise*

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Event-driven, non-blocking I/O

```js
// Synchronous (avoid this)
console.log('Reading file...')
var data = fs.readFileSync('data.txt')
var lines = data.toString().split('\n').length
console.log(lines + ' lines')
```

```js
// Asynchronous (embrace this)
fs.readFile('data.txt', function (err, data) {
  var lines = data.toString().split('\n').length
  console.log(lines + ' lines')
})
console.log('Reading file...')
```

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

<!-- Thanks to Bert Belder for the inspiration behind this baby -->
<!-- http://www.youtube.com/watch?v=nGn60vDSxQ4 -->

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
    <td style="border: solid 2px rgb(134,136,118); padding: 2em 1em; text-align: center;">
      **V8**
    </td>
    <td style="border: solid 2px rgb(134,136,118); padding: 2em 1em; text-align: center;">
      **libuv**
    </td>
    <td style="border: solid 2px rgb(134,136,118); padding: 2em 1em; text-align: center;">
      *OpenSSL<br>zlib<br>http_parser*
    </td>
  </tr>
</table>

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## libuv and the event loop

<!-- <img src="img/eventloop1.gif" width="50%" height="50%"> -->
<!-- http://nodejsreactions.tumblr.com/post/53202934359/the-event-loop -->

<table style="margin: 20px auto;">
  <tr>
    <td colspan=3 style="border-bottom: dashed 2px rgb(134,136,118); padding: 1em; text-align: center;">
      **JavaScript callbacks**
    </td>
  </tr>
  <tr>
    <td style="text-align: center; padding: 0.5em;">Timers</td>
    <td style="text-align: center; padding: 0.5em;">
      <img src="img/eventloop2.gif" width="244" height="129">
      <!-- http://nodejsreactions.tumblr.com/post/56979518608/the-node-js-event-loop -->
    </td>
    <td style="text-align: center; padding: 0.5em;">Sleep?</td>
  </tr>
  <tr>
    <td style="text-align: center; padding: 0.5em;">Socket I/O</td>
    <td style="text-align: center; padding: 0.5em;">Filesystem I/O</td>
    <td style="text-align: center; padding: 0.5em;">OS events</td>
  </tr>
</table>
