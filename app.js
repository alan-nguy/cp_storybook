const express = require('express');
const passport = require('passport');
require('./config/passport')(passport);

const app = express();
const port = process.env.PORT || 5000;

// load routes
const auth = require('./routes/auth');

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('hi it works');
});

app.listen(port, console.log(`Server running at ${port}`));
