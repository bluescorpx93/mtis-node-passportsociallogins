var getConnection = require("typeorm").getConnection;
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require('bcrypt');

// Initialize User Table
var connection = getConnection();
var userRepository = connection.getRepository("User");

module.exports = (passport) =>{

  // ------------------------------------------------------------------------------
  // User serializing and deserializing

  passport.serializeUser( (user,done) => {
    done(null, user.id);
  });


  passport.deserializeUser( (id, done) => {
    userRepository.findOne({ id: id })
    .then( user => {
      if (user){
        console.log("Deserialize User - User Found");
        done(null, user);
      }
    })
    .catch(error => {
      console.log("Deserialize User - User Not Found");
      done(error, null);
    });
  });

  // ------------------------------------------------------------------------------
  // Local Sign Up
  var localSignupOptions = {
    usernameField: 'email',
    passwordField: "password",
    passReqToCallback: true
  };
  passport.use('local-signup', new LocalStrategy(localSignupOptions , (req, email, password, done) => {
    process.nextTick( () => {
      userRepository.findOne({ local_email: email })
      .then( user => {
        if (user){
          console.log("Email Taken Already");
          return done(null, false);
        } else {
          return bcrypt.hash(password, 10).then( (hash) => {
            var newLocalUser = {
              local_fullname :  req.body.full_name,
              local_email:      email,
              local_password:   hash,
              local_phone_no:   req.body.phone
            }
            userRepository.save(newLocalUser).then( (savedUser) => {
              console.log("User Created in DB");
              return done(null, newLocalUser);
            }).catch(err => {
              console.log(err);
              throw err;
            });
          });
        }
      })
      .catch( err => {
        console.log("TYPEORM ", err);
        return done(err);
      });

    });
  }));


  // ----------------------------------------------------------------------------
  //Local Login
  var localLoginOptions = {
    usernameField: 'email',
    passwordField: "password",
    passReqToCallback: true
  };
  passport.use('local-login', new LocalStrategy(localLoginOptions, (req, email, password, done) => {
    userRepository.findOne({ local_email: email })
    .then( user => {
      if (user){
        bcrypt.compare(password, user.local_password, function(err, result) {
          if (err){
            console.log("BCRYPT Pass Match Error: ",err);
            return done(null, false);
          }
          if (result){
            return done(null, user);
          }
        });
      } else {
        return done(null, false);
      }
    })
    .catch( err => {
      return done(null, false);
    });
  }));


  // ----------------------------------------------------------------------------
  // Facebook Signin
  var facebookLoginOptions = {
    clientID : `${process.env.FACEBOOK_APPID}`,
    clientSecret : `${process.env.FACEBOOK_APPSECRET}`,
    callbackURL : 'https://localhost:4000/auth/facebook/callback',
    profileFields : ['id', 'name', 'picture', 'emails']
  }
  passport.use(new FacebookStrategy(facebookLoginOptions, (token, refreshToken, profile, done)  => {
    process.nextTick( () => {
      userRepository.findOne({ facebook_id : profile.id })
      .then( user => {
        if (user){
          return done(null, user)
        } else {
          console.log(profile);
          var newFBUser = {
            facebook_id : profile._json.id,
            facebook_token : token,
            facebook_email : profile._json.email,
            facebook_propic_url : profile._json.picture.data.url
          }
          newFBUser.facebook_display_name = profile._json.first_name ? profile._json.first_name + " ": ""
          newFBUser.facebook_display_name += profile._json.middle_name ? profile._json.middle_name + " ": ""
          newFBUser.facebook_display_name += profile._json.last_name ? profile._json.last_name : ""

          userRepository.save(newFBUser).then( (savedUser) => {
            console.log("Facebook User Created in DB");
            return done(null, newFBUser);
          }).catch(err => {
            console.log(err);
            throw err;
          });
        }
      })
      .catch(err => {
        return done(err);
      })
    });
  }));


  // --------------------------------------------------------------------------------
  // GOOGLE SIGN IN
  var googleLoginOptions = {
    clientID : `${process.env.GOOGLE_CLIENTID}`,
    clientSecret : `${process.env.GOOGLE_CLIENTSECRET}`,
    callbackURL : 'https://localhost:4000/auth/google/callback',
  }
  passport.use(new GoogleStrategy(googleLoginOptions, (token, refreshToken, profile, done)  => {
    process.nextTick( () => {
      userRepository.findOne({ google_id : profile.id })
      .then( user => {
        if (user){
          return done(null, user);
        } else {
          var newGPlusUser = {
            google_id : profile.id,
            google_display_name : profile.displayName,
            google_email : profile.emails[0].value,
            google_propic_url : profile.photos[0].value,
            google_token : token
          }
          userRepository.save(newGPlusUser).then( (savedUser) => {
            console.log("Google User Created in DB");
            return done(null, savedUser);
          }).catch(err => {
            console.log(err);
            throw err;
          });
        }
      })
      .catch(err => {
        return done(err);
      });
    });
  }));
}
