(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['views/canvas', 'views/context', 'logging'], function(mainCanvas, mainContext, log) {
    var Layer;
    return Layer = (function() {
      function Layer(name, opacity, width, height, z) {
        this.name = name;
        this.opacity = opacity;
        this.width = width;
        this.height = height;
        this.z = z;
        this.updateOffsets = __bind(this.updateOffsets, this);;
        this.addOffsetChangedListener = __bind(this.addOffsetChangedListener, this);;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        this.offsetX = 0;
        this.offsetY = 0;
        this.components = [];
        this.offsetChangedListeners = [];
        this.dirty = true;
      }
      Layer.prototype.addDragListener = function(fn) {
        return mainCanvas.addDragListener(fn);
      };
      Layer.prototype.addDownListener = function(fn) {
        return mainCanvas.addDownListener(fn);
      };
      Layer.prototype.addMoveListener = function(fn) {
        return mainCanvas.addMoveListener(fn);
      };
      Layer.prototype.addDragEndListener = function(fn) {
        return mainCanvas.addDragEndListener(fn);
      };
      Layer.prototype.addUpListener = function(fn) {
        return mainCanvas.addUpListener(fn);
      };
      Layer.prototype.addOffsetChangedListener = function(fn) {
        return this.offsetChangedListeners.push(fn);
      };
      Layer.prototype.updateOffsets = function(x, y) {
        var fn, _i, _len, _ref, _results;
        this.offsetX = x;
        this.offsetY = y;
        _ref = this.offsetChangedListeners;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          fn = _ref[_i];
          _results.push(fn(x, y));
        }
        return _results;
      };
      Layer.prototype.addComponent = function(component) {
        this.components.push(component);
        return this.sort();
      };
      Layer.prototype.sort = function() {
        return this.components.sort(function(left, right) {
          return left.z - right.z;
        });
      };
      Layer.prototype.redraw = function() {
        this.dirty = true;
        return mainContext.redraw();
      };
      Layer.prototype.draw = function() {
        var c, _i, _len, _ref;
        if (this.dirty) {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          _ref = this.components;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            c.draw(this.context);
          }
        }
        mainContext.drawImage(this.canvas, this.offsetX, this.offsetY);
        return this.dirty = false;
      };
      return Layer;
    })();
  });
}).call(this);
