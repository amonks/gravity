// planet.js

define( ['vector', 'logger', 'canvas', 'url'],
  function(Vector, Logger, Canvas, URL) {
    var Planet = function(params) {
      this.velocity = params.velocity || 10;
      this.position = params.position || Vector(0,0);
      this.velocity = params.velocity || Vector(0,0);
      this.acceleration = params.acceleration || Vector(0,0);
    };

    Planet.draw = function() {
      Canvas.ctx2d.lineWidth = URL.params.planetLineWidth;
      Canvas.ctx2d.strokeStyle = URL.params.planetColor;
      Canvas.ctx2d.beginPath();
      Canvas.ctx2d.arc(
        this.position.x,
        this.position.y,
        this.mass,
        0,
        2 * Math.PI,
        false
      );
      Canvas.ctx2d.stroke();
    };

    return Planet;
  }
);

