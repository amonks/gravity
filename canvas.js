// canvas.js
//

define(['logger', 'vector'],
  function(Logger, Vector) {
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

    Canvas.randomPoint = function() {
      return new Vector(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    };

    return Canvas;
  }
);
