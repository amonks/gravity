// logger.js
//
// minimalist logging
//
// logger = new Logger({verbosity: 2});
// logger.log(1, "we see this");
// logger.log(3, "we don't see this");
//
// logger.verbosity(0); // now we see nothing

// initializer
Logger = function(params) {
  currentVerbosity = params.verbosity || 1;
};

// primary log function
Logger.log = function(verbosity, content) {
  if (this.verbosity() <= verbosity) {
    console.log(content);
  }
};

// set or get verbosity
Logger.verbosity = function(setTo) {
  if (typeof setTo === undefined) {
    return this.currentVerbosity;
  } else {
    this.currentVerbosity = setTo;
  }
};
