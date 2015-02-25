requirejs.config({
  // baseUrl: 'js',
  shim: {
    "vector": {
      exports: "Victor"
    },
    "three": {
      exports: "THREE"
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
