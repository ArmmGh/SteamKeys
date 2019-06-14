const app = require('express')();
// const http = require('http').Server(app);
const setup = require('./utils/start');
const bodyParser = require('body-parser');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const port = process.env.PORT || 3000;
const session = require('express-session');
const passport = require('passport');
const auth = require('./routes/auth');
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
require('./utils/passport');

setup(app);
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SECRET],
    maxAge: 24 * 60 * 60 * 100,
  }),
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: 'http://localhost:5000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  }),
);
app.use('/auth', auth);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.json({
      authenticated: false,
      message: 'user has not been authenticated',
    });
  } else {
    next();
  }
};

app.get('/', (req, res) => {
  res.send('LOL');
});
