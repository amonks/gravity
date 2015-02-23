// player.js

define(['vector', 'logger', 'canvas', 'url'],
  function(Vector, Logger, Canvas, URL) {
    var Player = {};

    Player.init = function(params) {
      Logger.log(3, "called Player.init()");
      this.position = params.position || new Vector(0, 0);
      this.mass = params.mass || 1;
      this.acceleration = params.acceleration || new Vector(0, 0);
      this.velocity = params.velocity || new Vector(0, 0);
      window.onkeyup = function(e) {
        Player.jumping = true;
      };
    };

    Player.gravity = function(planets) {
      this.acceleration = new Vector(0,0);
      for (var p in planets) {
        var planet = planets[p];
        var distance = this.position.distance(planet.position);
        var between = this.position.clone().subtract(planet.position);
        var uBetween = between.divide(new Vector(between.length(), between.length()));
        var magnitude = newtonsMagnitude(
          this.mass,
          planet.mass,
          distance + 1,
          100
        );
        var newtonsForce = uBetween.multiply(new Vector(-magnitude, -magnitude));
        this.acceleration.add(newtonsForce);
      }
    };

    Player.jump = function() {
      if (Player.onPlanet === true) {
        Logger.log(2, "Jump!");
        // accelerate away from Player.planetOn.position
        var jumpAcceleration = Player.position.clone().subtract(Player.planetOn.position);
        Player.velocity = jumpAcceleration.clone().divide( new Vector( 8, 8 ));
        Player.acceleration = jumpAcceleration;
        if (URL.params.autojump === 'false') {
          Player.jumping = false;
        }
      }
    };

    Player.draw = function() {
      Canvas.ctx2d.rect(
        this.position.x,
        this.position.y,
        URL.params.playerSize,
        URL.params.playerSize
      );
      Canvas.ctx2d.fillStyle = "white";
      Canvas.ctx2d.lineWidth = URL.params.playerLineWidth;
      Canvas.ctx2d.strokeStyle = URL.params.playerColor;
      Canvas.ctx2d.fill();
      Canvas.ctx2d.stroke();
    };

    newtonsMagnitude = function(m1, m2, r, G) {
      var mag = G * (m1 * m2) / Math.pow(r, 2);
      return mag;
    };

    return Player;
  }
);
