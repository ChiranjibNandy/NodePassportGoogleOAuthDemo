// module.exports = app => {
//     app.get('/login', (req, res) => {
//         res.send('On login route now!');
//     })
// }
const passport = require('passport');
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.send('On login route now!');
});

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
})); // Now we can say, as we have required in the passport
// strategy setup in index.js file

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('Logged in now using Google!');
}); // This time we have the code sent from google
// that we can exchange for the real user profile from google

module.exports = router;