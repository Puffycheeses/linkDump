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
const test = require('../src/app')

let newUser
let newLink
let newComment

describe('LinkDump:DatabaseAdditions', function () {
  describe('#newUser()', function () {
    it('Creates a new user', async function () {
      newUser = await test.newUser()
      let testValue = await test.userExists(newUser)
      testValue.should.be.true();
    })
  })

  describe('#newLink()', function () {
    it('Creates a new link', async function () {
      newLink = await test.newLink(newUser, "Test", "test")
      let testValue = await test.linkExists(newLink)
      testValue.should.be.true()
    })
  })

  describe('#newComment()', function () {
    it('Creates a new comment', async function () {
      newComment = await test.newComment(newUser, newLink, "test")
      let testValue = await test.commentExists(newComment)
      testValue.should.be.true()
    })
  })
})

describe('LinkDump:DatabaseRemovals', function () {
  describe('#newUser()', function () {
    it('Creates a new user', async function () {
      await test.removeUser(newUser)
      let testValue = await test.userExists(newUser)
      testValue.should.not.be.true();
    })
  })

  describe('#newLink()', function () {
    it('Creates a new link', async function () {
      await test.removeLink(newLink)
      let testValue = await test.linkExists(newLink)
      testValue.should.not.be.true()
    })
  })

  describe('#newComment()', function () {
    it('Creates a new comment', async function () {
      await test.removeComment(newComment)
      let testValue = await test.commentExists(newComment)
      testValue.should.not.be.true()
    })
  })
})