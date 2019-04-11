/*
  Written by Puffycheeses (2019)
  Code from sources:
  - (Line no.) Source
*/

const debug = require('debug')('LinkDump:DatabaseGet')
const privateFunc = require("../Private/Private")

async function getUserData (uUid) {
  return await privateFunc.user.findOne({ uUid: uUid })
}

async function getPost (getBy, value = false) {
  const getTypes = ["all", "uPid", "uUid", "pre"]
  if (!getTypes.includes(getBy)) { return false }
  switch (getBy) {
    case "all":
      return await privateFunc.link.find().sort('-created_at').limit(10)
    case "uPid":
      return await privateFunc.link.find({ uPid:value })
    case "uUid":
      return await privateFunc.link.find({ uUid:value })
    case "pre":
      return await privateFunc.link.find({ pre:value })
    default:
      debug("oh lawd")
      return false // This should never be called ever
  }
}

module.exports = {
  getUserData: getUserData,
  getPost: getPost
}