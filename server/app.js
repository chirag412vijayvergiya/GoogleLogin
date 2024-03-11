const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

const session = require("express-session");
const passport = require("passport");
const OAuth2Stratergy = require("passport-google-oauth2").Strategy;

const clientid = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(express.json());

// setup session
app.use(
  session({
    secret: "shree-rambabuji-349842=-nm,n-jfdjf",
    resave: false,
    saveUninitialized: true,
  })
);

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Stratergy({
    clientID: clientid,
    clientSecret: clientsecret,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
  })
);

// app.get("/", (req, res) => {
//   res.status(200).json("server start");
// });

module.exports = app;
