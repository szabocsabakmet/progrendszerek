const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const User = require("./models/user");

const app = express();

const port = process.env.PORT || 3000;
const dbUrl = 'mongodb+srv://user:asdasd@progrendszerek.s0rec.mongodb.net/progrendszerek?retryWrites=true&w=majority';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true})
.then((message) => console.log("connected to db"))
.catch((error) => console.log("failed to connet db", error));

const whitelist = ['https://progrendszerek.web.app',
'https://progrendszerek.firebaseapp.com',
'http://localhost:4200','http://localhost:3000', 'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop'];

var corsOptions = {
    origin: function (origin, callback) {
        console.log("origin", origin);
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 
    'Origin', 'Accept']
  };

app.use(cors(corsOptions));

mongoose.connection.on('connected', () => {
    console.log('DB Connected');
})

mongoose.connection.on('error', (err) => {
    console.log('Error occurred', err);
})

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

passport.use('local', new localStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) return done('DB Error', null);
        if (!user) return done('Username not exist', null);
        user.comparePasswords(password, function (error, isMatch) {
            if (error) return done(error, false);
            if (!isMatch) return done('Wrong password', false);
            return done(null, user);
        })
    })
}));

passport.serializeUser(function (user, done) {
    if (!user) return done('User not provided', null);
    return done(null, user);
});

passport.deserializeUser(function (user, done) {
    if (!user) return done("User not provided", null);
    return done(null, user);
});

app.use(expressSession({ secret: 'W98712jNklasjd23', resave: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.get('/', (req, res) => res.render('pages/index'));

app.use('/', require('./routes'));
app.use('/secondary', require('./routes'));

app.use((req, res, next) => {
    res.status(404).send('Not exist');
})

app.listen(port, () => {
    console.log('The server is running!');
})

