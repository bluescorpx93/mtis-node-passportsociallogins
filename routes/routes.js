module.exports = (app, passport) => {
  app.get('/', (req, res) =>{
    res.render('index.ejs');
  });

  // ---------------------------------------------------------------------
  // Local Auth URLS
  app.get('/auth/login', (req, res) => {
    res.render('login.ejs');
  });

  var localLoginRouteRedirects = {
    successRedirect : '/profile',
    failureRedirect : '/login',
  };
  app.post('/auth/login', passport.authenticate('local-login', localLoginRouteRedirects) );

  app.get('/auth/signup', (req, res) => {
    res.render('signup.ejs');
  });

  var localSignupRouteRedirects = {
    successRedirect : '/profile',
    failureRedirect : '/signup'
  }
  app.post('/auth/signup', passport.authenticate('local-signup', localSignupRouteRedirects) );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // --------------------------------------------------------------------
  // Facebook Auth URLS
  var fbAuthOptions = {
    scope: ['public_profile', 'email']
  }
  app.get('/auth/facebook', passport.authenticate('facebook', fbAuthOptions) );

  var fbLoginRouteRedirects = {
    successRedirect : '/profile',
    failureRedirect : '/'
  }
  app.get('/auth/facebook/callback', passport.authenticate('facebook', fbLoginRouteRedirects) );

  // --------------------------------------------------------------------
  // Google Login URLS
  var gPlusAuthOptions = {
    scope: ['profile', 'email']
  }
  app.get('/auth/google', passport.authenticate('google', gPlusAuthOptions));

  var gPlusLoginRouteRedirects = {
    successRedirect : '/profile',
    failureRedirect : '/'
  }
  app.get('/auth/google/callback', passport.authenticate('google', gPlusLoginRouteRedirects));

  // --------------------------------------------------------------------
  // Route Protected URLS
  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs', { user: req.user});
  });

};


isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}
