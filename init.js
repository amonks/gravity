requirejs.config({
  // baseUrl: 'js',
  shim: {
    'logger': {
      exports: 'Logger'
    }
  }
});

requirejs(['app', 'logger'],
  function(Gravity, Logger) {
    Logger.log(1, "calling Gravity.init()");
    Gravity.init();
  }
);
