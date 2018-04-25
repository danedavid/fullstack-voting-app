const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const Tech = require('./models/tech');
const typeDefs = fs.readFileSync(path.resolve(__dirname, 'schema.graphql')).toString();

mongoose.connect('mongodb://danedavid:password@ds121889.mlab.com:21889/votingapp');

const resolvers = {
  Query: {
    techs: () => Tech.find({}).lean().exec()
  },
  Mutation: {
    upvote: (root, { id }) => Tech.findOneAndUpdate(
      { id },
      { $inc: { votes: 1 } },
      { new: true }
    ).catch(err => {
      console.log('Database error: ', err);
    }),

    resetVote: (root, { id }) => Tech.findOneAndUpdate(
      { id },
      { votes: 0 },
      { new: true }
    ).catch(err => {
      console.log('Database error: ', err);
    })
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = {
  graphql: graphqlExpress({ schema }),
  graphiql: graphiqlExpress({ endpointURL: '/graphql' })
};
