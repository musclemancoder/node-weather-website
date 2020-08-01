const express = require("express");
const path = require("path");
const getGeoCode = require("./utils/geocode");
const getWeatherForeCast = require("./utils/forecast");

const app = express();
const hbs = require("hbs");

//define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup static directory to serve
app.use(express.static(publicDirectory));

//setup handle bars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "vishal",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather app",
    name: "vishal",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather app",
    name: "vishal",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide location",
    });
  }
  getGeoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send(error);
      } else {
        getWeatherForeCast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send(error);
          } else {
            res.send({
              forecast: forecastData,
              location,
              address: req.query.address,
            });
          }
        });
      }
    }
  );
});

app.get("/help/*", (req, res) => {
  res.send("help page not found");
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Vishal",
    title: "404 Not Found",
    errorMsg: "Page Not Found",
  });
});

app.listen(3200, () => {
  console.log("running");
});
