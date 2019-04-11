// Examples cause I know I am going to forget how to make tests
// describe('Parent', function() {
//   describe('#Function()', function() {
//     it('should do this', function() {
//       assert.equal(thing, to thing);
//     });
//   });
// });
//
// describe('#find()', function() {
//   it('responds with matching records', async function() {
//     const users = await db.find({ type: 'User' });
//     users.should.have.length(3);
//   });
// });

require('should');
const DatabaseAdditions = require('../src/Database/DatabaseAdditions')
const DatabaseCheck = require('../src/Database/DatabaseCheck')
const DatabaseRemovals = require('../src/Database/DatabaseRemovals')

let newUser
let newLink
let newComment

describe('LinkDump:DatabaseAdditions', function () {
  describe('#newUser()', function () {
    it('Creates a new user', async function () {
      newUser = await DatabaseAdditions.newUser().unique
      let testValue = await DatabaseCheck.userExists(newUser)
      testValue.should.be.true();
    })
  })

  describe('#newLink()', function () {
    it('Creates a new link', async function () {
      newLink = await DatabaseAdditions.newLink(newUser, "Test", "test")
      let testValue = await DatabaseCheck.linkExists(newLink)
      testValue.should.be.true()
    })
  })

  describe('#newComment()', function () {
    it('Creates a new comment', async function () {
      newComment = await DatabaseAdditions.newComment(newUser, newLink, "test")
      let testValue = await DatabaseCheck.commentExists(newComment)
      testValue.should.be.true()
    })
  })
})

describe('LinkDump:DatabaseRemovals', function () {
  describe('#removeUser()', function () {
    it('Removes a user', async function () {
      await DatabaseRemovals.removeUser(newUser)
      let testValue = await DatabaseCheck.userExists(newUser)
      testValue.should.be.false();
    })
  })

  describe('#removeLink()', function () {
    it('Removes a link', async function () {
      await DatabaseRemovals.removeLink(newLink)
      let testValue = await DatabaseCheck.linkExists(newLink)
      testValue.should.be.false()
    })
  })

  describe('#removeComment()', function () {
    it('Removes a comment', async function () {
      await DatabaseRemovals.removeComment(newComment)
      let testValue = await DatabaseCheck.commentExists(newComment)
      testValue.should.be.false()
    })
  })
})