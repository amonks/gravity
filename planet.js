// planet.js

define( ['vector', 'logger', 'canvas'],
  function(Vector, Logger, Canvas) {
    var Planet = function(params) {
      this.velocity = params.velocity || 10;
      this.position = params.position || Vector(0,0);
      this.velocity = params.velocity || Vector(0,0);
      this.acceleration = params.acceleration || Vector(0,0);
    };

    Planet.draw = function() {
      Logger.log(3, "called Planet.draw()");
      Canvas.ctx2d.beginPath();
      Canvas.ctx2d.ellipse(
        this.position.x,
        this.position.y,
        Math.sqrt(this.mass),
        Math.sqrt(this.mass),
        0,
        0,
        2 * Math.PI
      );
      Canvas.ctx2d.stroke();
    };

    return Planet;
  }
);

