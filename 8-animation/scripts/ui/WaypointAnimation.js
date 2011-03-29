(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['ui/Animation', 'ui/Position', 'math', 'log'], function(Animation, Position, math, log) {
    var WaypointAnimation;
    return WaypointAnimation = (function() {
      __extends(WaypointAnimation, Animation);
      function WaypointAnimation(layer, waypoints, velocity) {
        this.waypoints = waypoints;
        this.velocity = velocity;
        this.animate = __bind(this.animate, this);;
        WaypointAnimation.__super__.constructor.call(this, layer);
        this.distanceTravelled = 0;
        this.listeners = [];
      }
      WaypointAnimation.prototype.addStopListener = function(fn) {
        return this.listeners.push(fn);
      };
      WaypointAnimation.prototype.animate = function(duration) {
        var angle, current, destination, directionX, directionY, dx, dy, fn, movement, mx, my, targetDistance, to, _i, _len, _ref;
        movement = Math.round(this.velocity.calculate(this.distanceTravelled, this.timeSinceLastAnimation()));
        this.distanceTraveled += movement;
        destination = null;
        while (movement > 0 && this.waypoints.length > 0) {
          current = this.layer.position;
          to = this.waypoints[0];
          targetDistance = math.distanceFrom(current, to);
          if (targetDistance > movement) {
            dx = Math.abs(current.x - to.x);
            dy = Math.abs(current.y - to.y);
            directionX = to.x > current.x ? 1 : -1;
            directionY = to.y > current.y ? 1 : -1;
            angle = Math.atan(dy / dx);
            mx = Math.round(Math.cos(angle) * movement);
            my = Math.round(Math.sin(angle) * movement);
            destination = new Position(current.x + (mx * directionX), current.y + (my * directionY));
            movement = 0;
          } else {
            movement = movement - targetDistance;
            destination = this.waypoints[0];
            current = this.waypoints[0];
            if (this.waypoints[0].reached) {
              this.waypoints[0].reached();
            }
            this.waypoints = this.waypoints.slice(1, this.waypoints.length);
          }
        }
        if (destination && (this.layer.position.x !== destination.x || this.layer.position.y !== destination.y)) {
          this.layer.position.set(destination.x, destination.y);
          this.updateLastAnimated();
        }
        if (this.waypoints.length === 0) {
          _ref = this.listeners;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            fn = _ref[_i];
            fn();
          }
          return this.stop();
        }
      };
      return WaypointAnimation;
    })();
  });
}).call(this);
