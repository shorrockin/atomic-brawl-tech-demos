(function() {
  define(["constants", "logging"], function(constants, log) {
    var Hexagon;
    return Hexagon = (function() {
      function Hexagon(x, y) {
        this.x = x;
        this.y = y;
      }
      Hexagon.prototype.toString = function() {
        return "Hexagon(x: " + this.x + ", y: " + this.y + ")";
      };
      return Hexagon;
    })();
  });
}).call(this);
