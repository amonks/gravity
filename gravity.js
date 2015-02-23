// gravity.js

define( ['logger', 'canvas', 'planet', 'vector', 'player'],
  function(Logger, Canvas, Planet, Vector, Player) {
    var Gravity = {};

    // initializer
    Gravity.init = function() {
      Logger.log(3, "called Gravity.init()");
      Canvas.init();
      Player.init({
        position: Canvas.randomPoint(),
        mass: 1,
        jumping: true
      });
      Player.draw();
      Gravity.planets = [];

      // make a planet
      var zeroPlanet = Object.create(Planet);
      zeroPlanet.position = Canvas.randomPoint();
      zeroPlanet.mass = Math.random() * 15 + 90;
      Gravity.planets.push(zeroPlanet);

      // make one planet
      var firstPlanet = Object.create(Planet);
      firstPlanet.position = Canvas.randomPoint();
      firstPlanet.mass = Math.random() * 15 + 90;
      Gravity.planets.push(firstPlanet);

      // make another planet
      var secondPlanet = Object.create(Planet);
      secondPlanet.position = Canvas.randomPoint();
      secondPlanet.mass = Math.random() * 15 + 90;
      Gravity.planets.push(secondPlanet);

      Logger.log(2, "starting animation");
      this.frame();

    };

    Gravity.frame = function() {
      Logger.log(2, "new frame");

      console.log("about to do gravity function", Player.position.x, Player.position.y, Player.velocity.x, Player.velocity.y);
      Player.gravity(Gravity.planets);
      console.log("just did gravity function", Player.position.x, Player.position.y, Player.velocity.x, Player.velocity.y);

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

      if (Player.jumping === true) {
        Player.jump();
      }


      // if(Player.velocity.magnitude() > 5) {
      //   console.log("clipping velocity", Player.velocity.magnitude());
      //   Player.velocity = Player.velocity.norm().multiply(new Vector(5, 5));
      //   console.log("clipped velocity", Player.velocity.magnitude());
      // }

      console.log("about to add velocity to position", Player.position.x, Player.position.y, Player.velocity.x, Player.velocity.y);
      Player.position.add(Player.velocity);
      console.log("just added velocity to position", Player.position.x, Player.position.y, Player.velocity.x, Player.velocity.y);

      for (p in Gravity.planets) {
        var planet = Gravity.planets[p];
        planet.draw();
      }
      Player.draw();

      Logger.log(2, {player: Player, planets: Gravity.planets, "this": this});
      setTimeout(Gravity.frame, 10);
    };

    return Gravity;
  }
);
