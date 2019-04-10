
const privateFunc = require('../Private/Private')
const debug = require('debug')('LinkDump:DatabaseCheck')

async function userExists (uUid) {
  return await privateFunc.user.countDocuments({ uUid: uUid }) > 0
}

async function linkExists (uPid) {
  return await privateFunc.link.countDocuments({ uPid: uPid }) > 0
}

async function commentExists (uCid) {
  return await privateFunc.comment.countDocuments({ uCid: uCid }) > 0
}

module.exports = {
  userExists: userExists,
  linkExists: linkExists,
  commentExists: commentExists
}
