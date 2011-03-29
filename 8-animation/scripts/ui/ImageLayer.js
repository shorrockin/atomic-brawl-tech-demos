(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['log', 'ui/Layer'], function(log, Layer) {
    var ImageLayer;
    return ImageLayer = (function() {
      __extends(ImageLayer, Layer);
      function ImageLayer(name, image, parent) {
        this.image = image;
        this.redraw = __bind(this.redraw, this);;
        ImageLayer.__super__.constructor.call(this, name, parent);
        this.dimensions.set(this.image.width, this.image.height);
      }
      ImageLayer.prototype.redraw = function() {
        return this.drawImage(this.image, 0, 0, this.image.width, this.image.height);
      };
      return ImageLayer;
    })();
  });
}).call(this);
