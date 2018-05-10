const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const request = require('request');
const { graphql, graphiql } = require('./server/server');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(compression());
// Serve static assets
app.use(express.static(path.resolve(__dirname, 'client', 'dist')));

// Server end-points
app.post('/graphql',  bodyParser.json(), graphql);
app.get('/graphiql',  bodyParser.json(), graphiql);

app.get('/authorize', (req,res) => {
  const { code } = req.query;

  request({
    //TODO: take client_secret from DB
    url: `https://github.com/login/oauth/access_token?code=${code}&client_id=1759a4054580059ed00e&client_secret=b02f2a6956ec13d1bf9b5b82be60116c667dfde0`,
    method: 'POST',
    json: true
  }, (err, response) => {
    if ( err ) {
      console.log('Error with GH API: ', err);
    } else {
      const { access_token } = response.body;

      res.redirect(`/?access_token=${access_token}`);
    }
  })
});

// Serve client app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
});

module.exports = app;
