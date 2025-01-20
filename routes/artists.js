const express = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const queryString = require("qs");

const library = require("../utils/library");

const router = express.Router();

router.use(cookieParser());

router.get("/artists", (req, res, next) => {
  // Send GET Request to User's Top Artists
  const access_token = req.cookies["access_token"];

  const options = {
    headers: { Authorization: `Bearer ${access_token}` },
  };

  const topArtistsURL = "https://api.spotify.com/v1/me/top/artists";

  axios
    .get(topArtistsURL, options)
    .then(function (response) {
      const topArtistsArray = response.data.items;

      const topArtistsImageURLs =
        library.returnImageSourcesFrom(topArtistsArray);

      res.render("artists", {
        path: "artists",
        pageTitle: "Artists",
        topArtistsArray: topArtistsArray,
        topArtistsImageURLs: topArtistsImageURLs,
      });
    })
    .catch(function (error) {
      console.log(error);

      res.redirect(
        "/refresh_token?" +
          queryString.stringify({
            path: "artists",
          })
      );
    });
});

module.exports = router;
