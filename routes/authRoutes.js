// FILE FOR HANDLING ROUTES
const passport = require("passport");

// export routes
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/facebook",
    // 'google' tells passport to use the google strategy
    passport.authenticate("facebook", {
      scope: ["email"] // list of internal permissions we want
    })
  );

  // passport.authenticate is same but since already authenticated it brings them to user profile
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); // takes cookie and elminates id in there
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
