requirejs.config({
  // baseUrl: 'js',
  shim: {
    "vector": {
      exports: "Victor"
    }
  }
});

requirejs(['gravity', 'logger'],
  function(Gravity, Logger) {
    // start logger
    Logger.init({verbosity: 3});

    // start game
    Logger.log(3, "calling Gravity.init()");
    Gravity.init();
  }
);
