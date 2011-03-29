(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['jquery', 'constants', 'canvas', 'context', 'log', 'ui/Layer'], function($, constants, canvas, context, log, Layer) {
    var DirtyLayer;
    return DirtyLayer = (function() {
      __extends(DirtyLayer, Layer);
      function DirtyLayer() {
        this.redraw = __bind(this.redraw, this);;
        this.enabled = __bind(this.enabled, this);;        DirtyLayer.__super__.constructor.call(this, "dirty_rectangles");
        this.dimensions.set(canvas.width, canvas.height, 9999);
        this.checked = $("#enable_dirty").attr("checked");
        $("#enable_dirty").change(__bind(function(event) {
          return this.checked = $("#enable_dirty").attr("checked");
        }, this));
      }
      DirtyLayer.prototype.enabled = function() {
        return this.checked;
      };
      DirtyLayer.prototype.redraw = function() {
        context.lineWidth = 1;
        context.strokeStyle = constants.dirtyStrokeStyle;
        return canvas.dirty.each(function(rectangle) {
          return context.strokeRect(rectangle.x1, rectangle.y1, rectangle.width, rectangle.height);
        });
      };
      return DirtyLayer;
    })();
  });
}).call(this);
