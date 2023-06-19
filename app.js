if (process.env.NODE_ENV !== "production") require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const loginRouter = require("./routes/login");
const tracksRouter = require("./routes/tracks");
const albumsRouter = require("./routes/albums");
const recentRouter = require("./routes/recent");
const profileRouter = require("./routes/profile");
const artistsRouter = require("./routes/artists");
const callbackRouter = require("./routes/callback");
const playlistsRouter = require("./routes/playlists");
const trackAnalysisRouter = require("./routes/track_analysis");

const errorController = require("./controllers/errorPage");
const refreshTokenController = require("./controllers/refreshToken");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Route Handling
app.use(refreshTokenController);
app.use(loginRouter);
app.use(callbackRouter);
app.use(profileRouter);
app.use(artistsRouter);
app.use(tracksRouter);
app.use(playlistsRouter);
app.use(recentRouter);
app.use(trackAnalysisRouter);
app.use(albumsRouter);

// 404 Handling
app.use(errorController);

app.listen(process.env.PORT || 3000, () =>
  console.log("App running on port", 3000)
);
