const express = require("express");
const cookieParser = require("cookie-parser");

const state = require("../utils/state");

const router = express.Router();

router.use(cookieParser());

router.get("/", (req, res, next) => {
  res.render("login", {
    path: "login",
    pageTitle: "Analyzer",
  });
});

// Scopes in Use
// playlist-read-private: Get a List of Current User's Playlists
// user-top-read: Get a User's Top Artists and Tracks
// user-follow-read: Get User's Followed Artists
// user-read-recently-played: Get Current User's Recently Played Tracks
// user-library-read: Get Current User's Saved Albums

router.post("/login", (req, res, next) => {
  // Set Cookie for State
  const options = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  res.cookie("stateKey", state, options);

  // Redirect to Callback Router (Handles Access Token Retrieving)
  const scopes =
    "playlist-read-private user-top-read user-follow-read user-read-recently-played user-library-read";
  res.redirect(
    `${process.env.AUTH_ENDPOINT}?response_type=code&client_id=${
      process.env.CLIENT_ID
    }&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(
      process.env.NODE_ENV !== "production"
        ? process.env.DEV_REDIRECT_URI
        : process.env.PROD_REDIRECT_URI
    )}&state=${state}`
  );
});

module.exports = router;
