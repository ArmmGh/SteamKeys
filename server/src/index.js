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
require('./utils/passport');

setup(app);
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    name: 'steam_session',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth);
app.get('/', (req, res) => {
  res.send(req.user);
});
