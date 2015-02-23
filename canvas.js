// canvas.js
//

define(['logger'],
  function(Logger) {
    Canvas = {};

    // initializer
    Canvas.init = function() {
      Logger.log(3, "called Canvas.init()");
      this.canvas = document.getElementById("canvas");
      this.ctx2d = this.canvas.getContext("2d");
      this.canvas.setAttribute("width", window.innerWidth);
      this.canvas.setAttribute("height", window.innerHeight);
      Logger.log(2, this);
    };
    return Canvas;
  }
);
