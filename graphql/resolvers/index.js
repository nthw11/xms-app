const postsResolvers = require('./posts');
const usersResovlers = require('./users');
const commentsResovlers = require('./comments');

module.exports = {
  Post: {
    likeCount(parent) {
      console.log(parent);
      return parent.likes.length;
    },
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResovlers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResovlers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
