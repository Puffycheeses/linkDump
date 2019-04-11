/*
  Written by Puffycheeses (2019)
  Code from sources:
  - (Line no.) Source
*/

const debug = require('debug')('LinkDump:Main')
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const databaseCheck = require('./Database/DatabaseCheck')
const databaseAdditions = require('./Database/DatabaseAdditions')

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

http.listen(port, function(){
  debug('listening on *:3000');
});

io.on('connection', function (socket) {
  debug('New Connection!')
  socket.on('disconnect', function(){
    debug('user disconnected :(');
  });
  socket.on('newLink', async function (cookie, content) {
    if(!await databaseCheck.checkCookies(cookie)) {
      socket.emit('cookieError')
      return false
    }
    databaseAdditions.newLink(cookie.uUid, content.title, content.link)
      .catch(e => {
        socket.emit('newLinkError')
        return e
      })
  })
  socket.on('newUser', async function () {
    let userDetails = await databaseAdditions.newUser()
    socket.emit('userDetails', userDetails)
  })
})



debug("Running!")