// # logger.js
//
// minimalist logging
//
//
// ## usage
//
// // init
// Logger.init({verbosity: 1});
//
// // log
// Logger.log(0, "error");
// Logger.log(1, "major event");
// Logger.log(2, "minor event");
// Logger.log(3, "everything");
//
// // check verbosity
// Logger.verbosity();
//
// // set verbosity
// Logger.verbosity(0) // only log errors

// initializer

define(function(params) {
  Logger = {};

  // initializer
  Logger.init = function(params) {
    console.log("initializing logger");
    this.verbosity(params.verbosity || 1);
  };

  // primary log function
  Logger.log = function(verbosity, content) {
    if (this.verbosity() >= verbosity) {
      console.log("l" + verbosity + ":", content);
    }
  };

  // set or get verbosity
  Logger.verbosity = function(setTo) {
    if (typeof setTo === "undefined") {
      return this.currentVerbosity;
    } else {
      this.currentVerbosity = setTo;
    }
  };

  return Logger;
});
