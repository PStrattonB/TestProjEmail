// config/prod.js is the same as config/dev.js, but with the production keys.

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI:  process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
}