const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const Tech = require('./models/tech');
const typeDefs = fs.readFileSync('./schema.graphql').toString();

const app = express();
const PORT = 5000;

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

app.use('*', cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () => {
  console.log(`GraphQL is running at http://localhost:${PORT}/graphiql`);
});
