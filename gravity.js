// gravity.js

define( ['logger', 'canvas', 'planet', 'player', 'url', 'three', 'world'],
  function(Logger, Canvas, Planet, Player, URL, THREE, World) {
    var Gravity = {};

    // initializer
    Gravity.init = function() {
      Logger.log(3, "called Gravity.init()");

      URL.init();
      Canvas.init();
      World.init();
      Player.init({
        position: Canvas.randomPoint(),
        mass: 1,
      });
      Player.draw();
      Gravity.planets = [];

      for (var i = 0; i < URL.params.planetCount; i++) {
        var planet = Object.create(Planet);
        planet.position = Canvas.randomPoint();
        planet.mass = Math.random() * URL.params.widthRange + URL.params.widthMin;
        Gravity.planets.push(planet);
      }

      Logger.log(2, "starting animation");
      this.frame();

    };

    Gravity.frame = function() {

      Player.update(Gravity.planets);

      for (var p in Gravity.planets) {
        var planet = Gravity.planets[p];
        if (URL.params.showPlanets === "true") {
          planet.draw();
        }
      }
      Player.draw();

      setTimeout(Gravity.frame, URL.params.msPerFrame);
    };

    return Gravity;
  }
);
