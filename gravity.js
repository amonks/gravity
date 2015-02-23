// gravity.js

define( ['logger', 'canvas', 'planet', 'vector', 'player', 'url'],
  function(Logger, Canvas, Planet, Vector, Player, URL) {
    var Gravity = {};

    // initializer
    Gravity.init = function() {
      Logger.log(3, "called Gravity.init()");

      URL.init();
      Canvas.init();
      Player.init({
        position: Canvas.randomPoint(),
        mass: 1,
      });
      Player.draw();
      Gravity.planets = [];

      for (var i = 0; i < URL.params.planetCount; i++) {
        var planet = Object.create(Planet);
        planet.position = Canvas.randomPoint();
        planet.mass = Math.random() * 50 + 80;
        Gravity.planets.push(planet);
      }

      Logger.log(2, "starting animation");
      this.frame();

    };

    Gravity.frame = function() {

      Player.gravity(Gravity.planets);

      var onPlanet = false;
      for (var p in Gravity.planets) {
        var touchingPlanet = Gravity.planets[p];
        if (Player.position.clone().subtract(touchingPlanet.position).magnitude() <= touchingPlanet.mass) {
          Logger.log(3, "on a planet!");
          onPlanet = true;
          Player.planetOn = touchingPlanet;
          Player.velocity = new Vector(0, 0);
          Player.acceleration = new Vector(0, 0);
        }
      }
      Player.onPlanet = onPlanet;

      Player.velocity.add(Player.acceleration);

      if (Player.jumping === true || URL.params.autojump === "true") {
        Player.jump();
      }

      Player.position.add(Player.velocity);

      for (p in Gravity.planets) {
        var planet = Gravity.planets[p];
        if (URL.params.showPlanets === "true") {
          planet.draw();
        }
      }
      Player.draw();

      setTimeout(Gravity.frame, 1);
    };

    return Gravity;
  }
);
