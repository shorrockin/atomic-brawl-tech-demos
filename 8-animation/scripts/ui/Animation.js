(function() {
  define(['animator', 'log'], function(animator, log) {
    var Animation;
    return Animation = (function() {
      function Animation(layer) {
        this.layer = layer;
        animator.addListener(this.animate);
        this.updateLastAnimated();
      }
      Animation.prototype.updateLastAnimated = function() {
        return this.lastAnimated = new Date().getTime();
      };
      Animation.prototype.timeSinceLastAnimation = function() {
        return new Date().getTime() - this.lastAnimated;
      };
      Animation.prototype.stop = function() {
        return animator.removeListener(this.animate);
      };
      return Animation;
    })();
  });
}).call(this);
