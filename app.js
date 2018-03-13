const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const passport = require('passport');

require('./config/passport')(passport);

// load routes
const auth = require('./routes/auth');

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('hi it works');
});



app.listen(port, console.log(`Running on port ${port}`));