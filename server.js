"use strict";

const express = require("express"),
  exphbs = require("express-handlebars"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;
let app = express();

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.text())
  .use(bodyParser.json({ type: "application/vnd.api+json" }))
  .use(express.static(__dirname + "/public"))
  .engine("handlebars", exphbs({ defaultLayout: "main" }))
  .set("view engine", "handlebars")
  .use(require("./controllers"));

mongoose.Promise = Promise;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoNews";

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");

  app.listen(PORT, function() {
    console.log("App running on http://localhost:" + PORT);
  });
});

module.exports = app;
