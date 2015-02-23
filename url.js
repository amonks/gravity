// url.js

define(['logger'], function(Logger) {
  URL = {};

  defaults = {
    "showPlanets": true,
    "widthRange": 50,
    "widthMin": 70,
    "autojump": true,
    "playerColor": "red",
    "planetColor": "black",
    "playerSize": 1,
    "lineWidth": 5
  };

  URL.getQueryParams = function() {
    var query = location.search.substr(1);
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
