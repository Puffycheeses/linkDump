/*
  Written by Puffycheeses (2019)
  Code from sources:
  - (Line no.) Source
*/

const privateFunc = require("../Private/Private")
const helpers = require("../Modules/helpers")
const databaseCheck = require("./DatabaseCheck")
const uuidv4 = require('uuid/v4');
const debug = require('debug')('LinkDump:DatabaseAdditions')

async function newUser () {
  debug("Creating New User")
  let unique = uuidv4()
  let Sunique = uuidv4()
  let newUser = new  privateFunc.user({
    uUid: unique,
    pre: false,
    sUid: Sunique
  })
  await newUser.save().catch(e => {return e})
  return {unique: unique, Sunique: Sunique}
}

async function newLink (user, title, _link) {
  debug("Creating New Link")
  if (!await databaseCheck.userExists(user)) return "User does not exist"
  let unique = uuidv4()
  let newLink = new  privateFunc.link({
    uPid: unique,
    user: user,
    title: helpers.escapeHtml(title),
    link: helpers.escapeHtml(_link)
  })
  await newLink.save().catch(e => {return e})
  return unique
}

async function newComment (user, parent, content) {
  debug("Creating New Comment")
  if (!await databaseCheck.userExists(user)) return "User does not exist"
  let unique = uuidv4()
  let newComment = new  privateFunc.comment({
    uCid: unique,
    user: user,
    parent: parent,
    content: helpers.escapeHtml(content)
  })
  await newComment.save().catch(e => {return e})
  return unique
}

module.exports = {
  newUser: newUser,
  newLink: newLink,
  newComment: newComment
}
