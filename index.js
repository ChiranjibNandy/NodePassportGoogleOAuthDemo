const express = require('express');
const authRoutes = require('./routes/authRoutes');
require('./services/passport-setup'); // It does not export anything
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./keys/dev');

mongoose.connect(keys.mongoDBURI);

const app = express(); // Creates an express application

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ['asdsadasdsadasda213213213'] // Can take any number of keys
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes); // Express Router gives you benefit of adding middlewares as well

const PORT = process.env.PORT || 5050;

app.get('/', (req, res) => {
    res.send("On the home page route now!");
})

app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT} for incoming requests`);
})