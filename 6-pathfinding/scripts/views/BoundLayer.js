(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['views/Layer', 'logging'], function(Layer, log) {
    var BoundLayer;
    return BoundLayer = (function() {
      __extends(BoundLayer, Layer);
      function BoundLayer(name, opacity, boundLayer, z) {
        this.name = name;
        this.opacity = opacity;
        this.boundLayer = boundLayer;
        this.z = z;
        BoundLayer.__super__.constructor.call(this, this.name, this.opacity, this.boundLayer.width, this.boundLayer.height, this.z);
        this.boundLayer.addOffsetChangedListener(__bind(function(x, y) {
          this.offsetX = x;
          this.offsetY = y;
          return this.redraw();
        }, this));
      }
      return BoundLayer;
    })();
  });
}).call(this);
