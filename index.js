const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds, there must be a better way to do this
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize()); // tell passport to use cookies
app.use(passport.session());

require('./routes/authRoutes')(app);

console.log('app running on port 5000');
const PORT = process.env.PORT || 5000;
app.listen(PORT);
