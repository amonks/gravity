// vector.js

Vector = function(x,y) {
  this.x = x;
  this.y = y;
  this.plus = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
  };
  this.times = function(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
  };
};
