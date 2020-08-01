const request = require("postman-request");
const getGeoCode = (address, callback) => {
  url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidmlzaGFsY2hvd2RocnkiLCJhIjoiY2tkNzB0Y2dlMDB3cDJ4bnYydTQ0ZWp0MCJ9.YK5PBfFEg3jli8QW5sxHkQ&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connnect to the geocode api!", undefined);
    } else if (body.features.length == 0) {
      callback("no geocode result found for this query", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = getGeoCode;
