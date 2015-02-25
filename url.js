// url.js

define(['logger'], function(Logger) {
  URL = {};

  defaults = {
    "msPerFrame": 1,        // miliseconds for each frame
    "showPlanets": "false", // enable drawing planets
    "widthRange": 50,       // range of planet masses
    "widthMin": 70,         // planet minimum mass (random() * widthRange + widthMin)
    "autojump": "true",     // automatically jump upon landing
    "planetColor": "black",
    "playerStroke": "#FFFFFF",  // accepts css colors
    "playerFill": "white",  // accepts css colors
    "playerWidth": 1,       // width of player rectangle
    "playerHeight": 1,      // height of player rectangle
    "planetLineWidth": 1,   // planet outline width
    "playerLineWidth": 1,   // player rectangle ilne width
    "planetCount": 4        // number of planets
  };

  // function to create a params object from the current url
  URL.getQueryParams = function() {
    var query = location.search.substr(1) + location.hash;
    var result = {};
    query.split("&").forEach(function(part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
    Logger.log(2, {"url params": result});
    return result;
  };

  URL.init = function() {
    var queryParams = URL.getQueryParams();
    var params = {};
    for (var index in defaults) {
      params[index] = queryParams[index] || defaults[index];
    }
    Logger.log(1, {"run params": params});
    URL.params = params;
  };

  return URL;
});
