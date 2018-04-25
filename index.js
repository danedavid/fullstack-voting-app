const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const { graphql, graphiql } = require('./server/server');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(compression());
// Serve static assets
app.use(express.static(path.resolve(__dirname, 'client', 'dist')));

// Serve client app
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

app.post('/graphql',  bodyParser.json(), graphql);
app.get('/graphiql',  bodyParser.json(), graphiql);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
});

module.exports = app;
