(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['utils/listeners', 'log'], function(listeners, log) {
    var Position;
    return Position = (function() {
      function Position(x, y) {
        this.x = x;
        this.y = y;
        this.toString = __bind(this.toString, this);;
        this.changeListeners = null;
      }
      Position.prototype.addChangeListener = function(fn) {
        this.changeListeners = this.changeListeners || [];
        return this.changeListeners.push(fn);
      };
      Position.prototype.fireChanged = function(event) {
        var fn, _i, _len, _ref, _results;
        if (this.changeListeners) {
          _ref = this.changeListeners;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            fn = _ref[_i];
            _results.push(fn(event));
          }
          return _results;
        }
      };
      Position.prototype.clone = function() {
        return new Position(this.x, this.y);
      };
      Position.prototype.move = function(x, y) {
        return this.set(this.x + x, this.y + (y ? y : 0));
      };
      Position.prototype.set = function(mx, my) {
        var original;
        if (mx !== this.x || my !== this.y) {
          original = {
            x: this.x,
            y: this.y
          };
          if (mx) {
            this.x = mx;
          }
          if (my) {
            this.y = my;
          }
          return this.fireChanged({
            from: original,
            to: this
          });
        }
      };
      Position.prototype.toString = function() {
        return "Position[x: " + this.x + ", y: " + this.y + "]";
      };
      return Position;
    })();
  });
}).call(this);
