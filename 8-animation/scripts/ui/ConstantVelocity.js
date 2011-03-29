(function() {
  define([], function() {
    var ConstantVelocity;
    return ConstantVelocity = (function() {
      function ConstantVelocity(pixelsPerSecond) {
        this.pixelsPerSecond = pixelsPerSecond;
      }
      ConstantVelocity.prototype.calculate = function(distanceTravelled, duration) {
        return (duration / 1000) * this.pixelsPerSecond;
      };
      return ConstantVelocity;
    })();
  });
}).call(this);
