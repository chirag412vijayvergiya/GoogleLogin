const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

const session = require("express-session");
const passport = require("passport");
const OAuth2Stratergy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema");

const clientid = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(express.json());

// setup session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// setuppassport

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Stratergy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      // console.log(profile);
      try {
        let user = await userdb.findOne({ googleId: profile.id });
        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }

        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Initial google auth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173/login",
  })
);

app.get("/login/success", async (req, res) => {
  // console.log(req.user);
  if (req.user) {
    res
      .status(200)
      .json({ message: "User Logged in successfully!", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    } else {
      res.redirect("http://localhost:5173");
    }
  });
});

// app.get("/", (req, res) => {
//   res.status(200).json("server start");
// });

module.exports = app;
