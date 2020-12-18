const postsResolvers = require('./posts')
const usersResovlers = require('./users')

module.exports = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResovlers.Mutation
  }
}