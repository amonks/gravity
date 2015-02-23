// player.js

define(['vector', 'logger', 'canvas'],
  function(Vector, Logger, Canvas) {
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
      Logger.log(3, "starting gravity function");
      this.acceleration = new Vector(0,0);
      for (var p in planets) {
        var planet = planets[p];
        var distance = this.position.distance(planet.position);
        var between = this.position.clone().subtract(planet.position);
        console.log("between.length()", between.length());
        var uBetween = between.divide(new Vector(between.length(), between.length()));
        var magnitude = newtonsMagnitude(
          this.mass,
          planet.mass,
          distance + 1,
          100
        );
        var newtonsForce = uBetween.multiply(new Vector(-magnitude, -magnitude));
        Logger.log(3, {"adding to acceleration": newtonsForce.x, "mag": magnitude});
        this.acceleration.add(newtonsForce);
      }
      console.log("finished gravity function", this.acceleration.x, this.acceleration.y, this.position.x, this.position.y);
    };

    Player.jump = function() {
      if (Player.onPlanet === true) {
        Logger.log(2, "Jump!");
        // accelerate away from Player.planetOn.position
        var jumpAcceleration = Player.position.clone().subtract(Player.planetOn.position);
        Player.velocity = jumpAcceleration.clone().divide( new Vector( 8, 8 ));
        Player.acceleration = jumpAcceleration;
        // Player.jumping = false;
      }
    };

    Player.draw = function() {
      Logger.log(3, "called Player.draw()");
      Canvas.ctx2d.rect(
        this.position.x,
        this.position.y,
        10,
        10
      );
      Canvas.ctx2d.fillStyle = "white";
      Canvas.ctx2d.fill();
      Canvas.ctx2d.stroke();
    };

    newtonsMagnitude = function(m1, m2, r, G) {
      var mag = G * (m1 * m2) / Math.pow(r, 2);
      Logger.log(2, {"newton's magnitude": mag});
      return mag;
    };

    return Player;
  }
);
