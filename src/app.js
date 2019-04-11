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
const databaseGet = require('./Database/DatabaseGet')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile( 'index.html')
})

http.listen(port, function(){
  debug('listening on *:3000');
});

io.on('connection', function (socket) {
  debug('New Connection!')
  socket.on('disconnect', function(){
    debug('user disconnected :(');
  });
  socket.on('newLink', async function (data) {
    debug(`New link submitted by ${data.cookie.uUid}`)
    if(!await databaseCheck.checkCookies(data.cookie)) {
      debug(`cookieError`)
      return false
    }
    databaseAdditions.newLink(data.cookie.uUid, data.post.title, data.post.link)
      .catch(e => {
        socket.emit('newLinkError')
        return e
      })
  })

  socket.on('newUser', async function () {
    let userDetails = await databaseAdditions.newUser()
    socket.emit('userDetails', userDetails)
  })

  socket.on('getPosts', async function (type, value=false) {
    debug('client asking for posts')
    let posts = await databaseGet.getPost('all', value)
    socket.emit('gotPosts', posts)
  })
})



debug("Running!")