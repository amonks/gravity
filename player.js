// player.js

define(['vector', 'logger', 'canvas', 'url', 'gravity'],
  function(Vector, Logger, Canvas, URL, Gravity) {
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

    Player.update = function(planets) {
      Player.applyGravityFromPlanets(planets);

      Player.checkCollision(planets);

      Player.velocity.add(Player.acceleration);

      if (Player.jumping === true || URL.params.autojump === "true") {
        Player.jump();
      }

      Player.position.add(Player.velocity);
    };

    Player.checkCollision = function(planets) {
      var onPlanet = false;
      for (var p in planets) {
        var touchingPlanet = planets[p];
        var distanceFromTouchingPlanet = Player.position.clone().subtract(touchingPlanet.position).magnitude();
        if (distanceFromTouchingPlanet <= touchingPlanet.mass + URL.params.playerWidth) {
          Logger.log(3, "on a planet!");
          onPlanet = true;
          Player.planetOn = touchingPlanet;
          Player.velocity = new Vector(0, 0);
          Player.acceleration = new Vector(0, 0);
        }
      }
      Player.onPlanet = onPlanet;
    };

    Player.applyGravityFromPlanets = function(planets) {
      this.acceleration = new Vector(0,0);
      for (var p in planets) {
        var planet = planets[p];
        var distance = this.position.distance(planet.position);
        var betweenVector = this.position.clone().subtract(planet.position);
        betweenVector.normalize();
        var gravityMagnitude = newtonsMagnitude(
          this.mass,
          planet.mass,
          distance + 1,
          URL.params.gravitationalConstant
        );
        var newtonsForce = betweenVector.multiply(new Vector(-gravityMagnitude, -gravityMagnitude));
        this.acceleration.add(newtonsForce);
      }
    };

    Player.jump = function() {
      if (Player.onPlanet === true) {
        Logger.log(2, "Jump!");
        // accelerate away from Player.planetOn.position
        var jumpAcceleration = Player.position.clone().subtract(Player.planetOn.position);
        Player.velocity = jumpAcceleration.clone().norm().multiply(new Vector(URL.params.jumpHeight));
        Player.acceleration = jumpAcceleration;
        if (URL.params.autojump === 'false') {
          Player.jumping = false;
        }
      }
    };

    Player.draw = function() {
      Canvas.ctx2d.fillStyle = URL.params.playerFill;
      Canvas.ctx2d.lineWidth = URL.params.playerLineWidth;
      Canvas.ctx2d.strokeStyle = URL.params.playerStroke;
      Canvas.ctx2d.rect(
        this.position.x,
        this.position.y,
        URL.params.playerWidth,
        URL.params.playerHeight
      );
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
