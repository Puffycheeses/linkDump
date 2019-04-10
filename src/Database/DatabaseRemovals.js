/*
  Written by Puffycheeses (2019)
  Code from sources:
  - (Line no.) Source
*/

const debug = require('debug')('LinkDump:DatabaseRemovals')
const privateFunc = require('../Private/Private')

async function removeUser (uUid) {
  await privateFunc.user.deleteOne({uUid:uUid}).catch(e => {return e})
  return true
}

async function removeLink (uPid) {
  await privateFunc.link.deleteOne({uPid:uPid}).catch(e => {return e})
  return true
}

async function removeComment (uCid) {
  await privateFunc.comment.deleteOne({uCid:uCid}).catch(e => {return e})
  return true
}

module.exports = {
  removeUser: removeUser,
  removeLink: removeLink,
  removeComment: removeComment
}