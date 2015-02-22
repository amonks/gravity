// body.js

// initializer
Body = function(params) {
  this.mass = params.mass || 1;
  this.position = params.position || new Vector(0,0);
  this.acceleration = params.acceleration || new Vector(0,0);
  this.velocity = params.velocity || new Vector(0,0);
};

// compute force from `body` according to newton's law of universal gravitation
// http://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation
Body.newtonsLaw = function(body) {
  var G = 6.67384 * Math.pow(10, -11);
  var distance = this.position.distance(body.position);
  var F = G * (this.mass * body.mass) / (distance * distance);
  return F;
};

// apply acceleration from `bodies` array
Body.gravity = function(bodies) {

  this.acceleration = new Vector(0,0);
  for (var body in bodies) {
    body = bodies[body];
    this.acceleration.plus(this.newtonsLaw(body));
  }
};
