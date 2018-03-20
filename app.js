const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
require('./models/User');
require('./config/passport')(passport);

const app = express();
const port = process.env.PORT || 5000;

// HANDLEBARS MIDDLEWARES
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// load routes
const auth = require('./routes/auth');
const index = require('./routes/index');

// CONNECT TO DB
mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log('mongo connected');
  })
  .catch((err) => {
    console.log(err);
  });

// MIDDLEWARES
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// PASSPORT MIDDLEWARES
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

app.use('/auth', auth);
app.use('/', index);

app.listen(port, console.log(`Server running at ${port}`));
