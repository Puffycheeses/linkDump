/*
  Written by Puffycheeses (2019)
  Code from sources:
  - (Line no.) Source
*/

const debug = require('debug')('LinkDump:Main')
const mongoose = require('mongoose')
const uuidv4 = require('uuid/v4');

mongoose.connect('mongodb://localhost:27017/linkdump', {useNewUrlParser: true}).catch(e => {debug(`ah fuck ${e}`)});

let userSchema = new mongoose.Schema({ uUid: String, pre: Boolean, sUid: String })
let linkSchema = new mongoose.Schema({ uPid: String, user: Object, title: String, link: String })
let commentSchema = new mongoose.Schema({ uCid: String, user: Object, parent: String, content: String })

let user = mongoose.model('users', userSchema)
let link = mongoose.model('links', linkSchema)
let comment = mongoose.model('comments', commentSchema)

async function userExists (uUid) {
  return await user.countDocuments({ uUid: uUid }) > 0
}

async function linkExists (uPid) {
  return await link.countDocuments({ uPid: uPid }) > 0
}

async function commentExists (uCid) {
  return await comment.countDocuments({ uCid: uCid }) > 0
}

async function getUserData (uUid) {
  return await user.findOne({ uUid: uUid })
}

async function newUser () {
  debug("Creating New User")
  let unique = uuidv4()
  let newUser = new user({
    uUid: unique,
    pre: false,
    sUid: null
  })
  await newUser.save().catch(e => {return e})
  return unique
}

async function newLink (user, title, _link) {
  debug("Creating New Link")
  if (!await userExists(user)) return "User does not exist"
  let unique = uuidv4()
  let newLink = new link({
    uPid: unique,
    user: user,
    title: escapeHtml(title),
    link: escapeHtml(_link)
  })
  await newLink.save().catch(e => {return e})
  return unique
}

async function newComment (user, parent, content) {
  debug("Creating New Comment")
  if (!await userExists(user)) return "User does not exist"
  let unique = uuidv4()
  let newComment = new comment({
    uCid: unique,
    user: user,
    parent: parent,
    content: escapeHtml(content)
  })
  await newComment.save().catch(e => {return e})
  return unique
}

async function getPost (getBy, value = false) {
  const getTypes = ["all", "uPid", "uUid", "pre"]
  if (!getTypes.includes(getBy)) { return false }
  switch (getBy) {
    case "all":
      return await link.find()
    case "uPid":
      return await link.find({ uPid:value })
    case "uUid":
      return await link.find({ uUid:value })
    case "pre":
      return await link.find({ pre:value })
    default:
      debug("oh lawd")
      return false // This should never be called ever
  }
}

function escapeHtml (text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
  }

  return text.replace(/[&<>"']/g, function (m) { return map[m] })
}

module.exports = {
  newUser: newUser,
  newLink: newLink,
  newComment: newComment,
  getUserData: getUserData,
  userExists: userExists,
  linkExists: linkExists,
  commentExists: commentExists
}

debug("Reached the documents bottom!")