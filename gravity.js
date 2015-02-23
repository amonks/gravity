// gravity.js

define( ['logger', 'canvas', 'planet', 'vector', 'player'],
  function(Logger, Canvas, Planet, Vector, Player) {
    var Gravity = {};

    // initializer
    Gravity.init = function() {
      Logger.log(3, "called Gravity.init()");
      Canvas.init();
      Player.init({
        position: new Vector(200, 200),
        mass: 10
      });
      Player.draw();
      Gravity.planets = [];

      // make a planet
      var zeroPlanet = Object.create(Planet);
      zeroPlanet.position = new Vector(650, 600);
      zeroPlanet.mass = 1000;
      Gravity.planets.push(zeroPlanet);

      // make one planet
      var firstPlanet = Object.create(Planet);
      firstPlanet.position = new Vector(450, 500);
      firstPlanet.mass = 1000;
      Gravity.planets.push(firstPlanet);

      // make another planet
      var secondPlanet = Object.create(Planet);
      secondPlanet.position = new Vector(400, 600);
      secondPlanet.mass = 300;
      Gravity.planets.push(secondPlanet);

      Logger.log(2, "starting animation");
      this.frame();

    };

    Gravity.frame = function() {
      Logger.log(2, "new frame");
      console.log("about to do gravity function", Player.position.x, Player.position.y, Player.velocity.x, Player.velocity.y);
      Player.gravity(Gravity.planets);
      console.log("just did gravity function", Player.position.x, Player.position.y, Player.velocity.x, Player.velocity.y);
      Player.velocity.add(Player.acceleration);
      console.log("about to add velocity to position", Player.position.x, Player.position.y, Player.velocity.x, Player.velocity.y);
      Player.position.add(Player.velocity);
      console.log("just added velocity to position", Player.position.x, Player.position.y, Player.velocity.x, Player.velocity.y);

      for (var planet in Gravity.planets) {
        planet = Gravity.planets[planet];
        planet.draw();
      }
      Player.draw();

      Logger.log(2, {player: Player, planets: Gravity.planets, "this": this});
      setTimeout(Gravity.frame, 100);
    };

    return Gravity;
  }
);
