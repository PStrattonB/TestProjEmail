const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { // user is the user record we pulled out of the database
    done(null, user.id); // user.id is the _id in the MongoDB database
});

passport.deserializeUser((id, done) => { // id is the user.id we passed in the serializeUser function
    User.findById(id) // find the user with the id
        .then(user => { // once we find the user, we call done with the user
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
        .then(existingUser => {
            if (existingUser) {
                // we already have record with the provided profile ID
                console.log('User already exists');
                done(null, existingUser); // first argument is an error object, second argument is the user record
            } else {
                // we do not have a user record with this ID, make a new record
                console.log('User does not exist');
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
            }
        });
}));
