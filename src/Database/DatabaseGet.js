/*
  Written by Puffycheeses (2019)
  Code from sources:
  - (Line no.) Source
*/

const debug = require('debug')('LinkDump:DatabaseGet')

async function getUserData (uUid) {
  return await user.findOne({ uUid: uUid })
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

module.exports = {
  getUserData: getUserData,
  getPost: getPost
}