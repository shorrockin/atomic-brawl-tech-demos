(function() {
  var requirements;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  requirements = [];
  requirements.push('log');
  requirements.push('canvas');
  requirements.push('context');
  requirements.push('constants');
  requirements.push('math');
  requirements.push('ui/LayerList');
  requirements.push('ui/Position');
  requirements.push('ui/AbsolutePosition');
  requirements.push('ui/Dimensions');
  requirements.push('ui/Rectangle');
  define(requirements, function(log, canvas, context, constants, math, LayerList, Position, AbsolutePosition, Dimensions, Rectangle) {
    var Layer;
    return Layer = (function() {
      function Layer(name, parent) {
        var computeBounds;
        this.name = name;
        this.parent = parent;
        this.toString = __bind(this.toString, this);;
        this.redraw = __bind(this.redraw, this);;
        this.layers = new LayerList();
        this.position = new Position(0, 0);
        this.absPosition = new AbsolutePosition(this, this.parent);
        if (this.parent) {
          this.dimensions = new Dimensions(0, 0, 0);
          this.parent.layers.push(this);
        } else {
          this.dimensions = new Dimensions(canvas.width, canvas.height, 0);
          canvas.layers.push(this);
        }
        computeBounds = __bind(function() {
          return this.bounds = new Rectangle(this.absPosition.x, this.absPosition.y, this.absPosition.x + this.dimensions.width, this.absPosition.y + this.dimensions.height);
        }, this);
        computeBounds();
        this.absPosition.addChangeListener(computeBounds);
        this.dimensions.addChangeListener(computeBounds);
        this.dimensions.addChangeListener(__bind(function(event) {
          var height, width;
          width = event.from.width > event.to.width ? event.from.width : event.to.width;
          height = event.from.height > event.to.height ? event.from.height : event.to.height;
          return canvas.dirty.push(new Rectangle(this.absPosition.x, this.absPosition.y, this.absPosition.x + width, this.absPosition.y + height));
        }, this));
        this.absPosition.addChangeListener(__bind(function(event) {
          var destination, origin;
          origin = new Rectangle(event.from.x, event.from.y, event.from.x + this.dimensions.width, event.from.y + this.dimensions.height);
          destination = new Rectangle(event.to.x, event.to.y, event.to.x + this.dimensions.width, event.to.y + this.dimensions.height);
          canvas.dirty.push(origin);
          return canvas.dirty.push(destination);
        }, this));
      }
      Layer.prototype.addDragListener = function(fn) {
        return canvas.addDragListener(fn);
      };
      Layer.prototype.addDownListener = function(fn) {
        return canvas.addDownListener(fn);
      };
      Layer.prototype.addMoveListener = function(fn) {
        return canvas.addMoveListener(fn);
      };
      Layer.prototype.addDragEndListener = function(fn) {
        return canvas.addDragEndListener(fn);
      };
      Layer.prototype.addUpListener = function(fn) {
        return canvas.addUpListener(fn);
      };
      Layer.prototype.mousePosition = function(event) {
        return math.gridAtMousePosition(event.x - this.absPosition.x, event.y - this.absPosition.y);
      };
      Layer.prototype.markDirty = function() {
        return canvas.dirty.push(this.bounds);
      };
      Layer.prototype.redraw = function(rectangle) {};
      Layer.prototype.enabled = function() {
        return true;
      };
      Layer.prototype.drawImage = function(image, x, y, width, height) {
        return context.drawImage(image, x + this.absPosition.x, y + this.absPosition.y, width, height);
      };
      Layer.prototype.beginPath = function() {
        return context.beginPath();
      };
      Layer.prototype.moveTo = function(x, y) {
        return context.moveTo(x + this.absPosition.x, y + this.absPosition.y);
      };
      Layer.prototype.lineTo = function(x, y) {
        return context.lineTo(x + this.absPosition.x, y + this.absPosition.y);
      };
      Layer.prototype.fill = function() {
        return context.fill();
      };
      Layer.prototype.fillStyle = function(value) {
        return context.fillStyle = value;
      };
      Layer.prototype.font = function(value) {
        return context.font = value;
      };
      Layer.prototype.fillText = function(text, x, y) {
        return context.fillText(text, x + this.absPosition.x, y + this.absPosition.y);
      };
      Layer.prototype.closePath = function() {
        return context.closePath();
      };
      Layer.prototype.toString = function() {
        return "Layer[name: " + this.name + ", position: " + this.position + ", absPosition: " + this.absPosition + ", bounds: " + this.bounds + ", dimensions: " + this.dimensions + ", parent: " + (this.parent ? this.parent.name : 'N/A') + "]";
      };
      return Layer;
    })();
  });
}).call(this);
