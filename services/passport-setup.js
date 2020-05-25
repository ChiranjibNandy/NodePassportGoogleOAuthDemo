const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/user-model');
const keys = require('../keys/dev');

passport.serializeUser((user, done) => {
    // Take the user and grab the piece of identifying info from that user and stuff into our browser cookie
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // Grab the id back from cookie and get the user back from id
    const user = await UserModel.findById(id);
    done(null, user);
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        // Passport callback function here 
        // accessToken - we recieve from google. We can alter the users' profile, read the mails from mailbox etc
        // refreshToken - refresh the accessToken as it expires after certain amount of time.
        console.log('User\'s profile: ', profile);

        // Before creating a new user with the profile fetched, check to see if the user already exists
        const existingUser = await UserModel.findOne({
            googleId: profile.id
        });

        if(existingUser) {
            done(null, existingUser); // After done we move to the serializeUser to stuff some piece
            // of identifying info in our browser cookie for subsequent requests
        } else {
            const newUser = await new UserModel({
                userName: profile.displayName,
                googleId: profile.id
            }).save();
            console.log('New User created ', newUser);
            done(null, newUser);
        }
        
    })
)