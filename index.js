const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
const { graphql, graphiql } = require('./server/server');

const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'client', 'dist')));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

app.post('/graphql', cors(), bodyParser.json(), graphql);
app.get('/graphiql', cors(), bodyParser.json(), graphiql);

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
});

module.exports = app;
