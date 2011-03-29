(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['log'], function(log) {
    var Dimensions;
    return Dimensions = (function() {
      function Dimensions(width, height, depth) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.toString = __bind(this.toString, this);;
        this.set = __bind(this.set, this);;
        this.clone = __bind(this.clone, this);;
        this.after = __bind(this.after, this);;
        this.before = __bind(this.before, this);;
        this.fireChanged = __bind(this.fireChanged, this);;
        this.addChangeListener = __bind(this.addChangeListener, this);;
        this.changeListeners = [];
      }
      Dimensions.prototype.addChangeListener = function(fn) {
        return this.changeListeners.push(fn);
      };
      Dimensions.prototype.fireChanged = function(event) {
        var fn, _i, _len, _ref, _results;
        _ref = this.changeListeners;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          fn = _ref[_i];
          _results.push(fn(event));
        }
        return _results;
      };
      Dimensions.prototype.before = function(dimensions) {
        return this.depth <= dimensions.depth;
      };
      Dimensions.prototype.after = function(dimensions) {
        return this.depth >= dimensions.depth;
      };
      Dimensions.prototype.clone = function() {
        return new Dimensions(this.width, this.height, this.depth);
      };
      Dimensions.prototype.set = function(width, height, depth) {
        var original;
        if (this.width !== width || this.height !== height || this.depth !== depth) {
          original = {
            width: this.width,
            height: this.height,
            depth: this.depth
          };
          if (width) {
            this.width = width;
          }
          if (height) {
            this.height = height;
          }
          if (depth) {
            this.depth = depth;
          }
          return this.fireChanged({
            from: original,
            to: this
          });
        }
      };
      Dimensions.prototype.toString = function() {
        return "Dimensions[width: " + this.width + ", height: " + this.height + ", depth: " + this.depth + "]";
      };
      return Dimensions;
    })();
  });
}).call(this);
