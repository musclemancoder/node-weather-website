const request = require("postman-request");
const getWeatherForeCast = (latitutde, longitute, callback) => {
  url =
    "http://api.weatherstack.com/current?access_key=9f7327e0c92de14fdf771ed3724b41e8&query=" +
    latitutde +
    "," +
    longitute +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connnect to the forecast api!", undefined);
    } else if (body.error) {
      callback("no forecast result found for this query", undefined);
    } else {
      callback(
        undefined,
        "Weather is " +
          body.current.weather_descriptions[0] +
          " and Temperature is " +
          body.current.temperature + " ."
      );
    }
  });
};
module.exports = getWeatherForeCast;
