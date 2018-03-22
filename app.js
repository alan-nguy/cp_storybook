const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path')
const keys = require('./config/keys');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
require('./models/User');
require('./models/Story');
require('./config/passport')(passport);

const app = express();
const port = process.env.PORT || 5000;

const {truncate, stripTags, formatDate, select, editIcon } = require('./helpers/hbs');

// load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// METHOD OVERRIDE MIDDLEWARE
app.use(methodOverride('_method'));

// HANDLEBARS MIDDLEWARES
app.engine('handlebars', exphbs({
  helpers: {
    truncate,
    stripTags, 
    formatDate,
    select,  
    editIcon
  },
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


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

// SERVE STATIC CONTENT FROM PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/stories', stories);

app.listen(port, console.log(`Server running at ${port}`));
