(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['jquery', 'constants', 'logging'], function($, constants, log) {
    var DragState, MouseDraggedEvent, MouseEvent, canvas, components, context, deviceCoordinateX, deviceCoordinateY, dragState, fire, logging, mouseDown, mouseDownListeners, mouseDragEndListeners, mouseDragListeners, mouseMove, mouseMoveListeners, mouseOut, mouseUp, mouseUpListeners;
    canvas = $('#canvas')[0];
    context = canvas.getContext('2d');
    logging = false;
    DragState = (function() {
      function DragState(event) {
        this.update = __bind(this.update, this);;        this.startDragX = deviceCoordinateX(event);
        this.startDragY = deviceCoordinateY(event);
        this.endDragX = this.startDragX;
        this.endDragY = this.startDragY;
        this.movementX = 0;
        this.movementY = 0;
      }
      DragState.prototype.update = function(event) {
        var initial;
        initial = !this.hasMoved;
        this.movementX = deviceCoordinateX(event) - this.endDragX;
        this.movementY = deviceCoordinateY(event) - this.endDragY;
        this.endDragX = deviceCoordinateX(event);
        return this.endDragY = deviceCoordinateY(event);
      };
      DragState.prototype.hasMoved = function() {
        return (this.startDragX !== this.endDragX) || (this.startDragY !== this.endDragY);
      };
      DragState.prototype.toString = function() {
        return "DragState(start: " + this.startDragX + "/" + this.startDragY + ", end: " + this.endDragX + "/" + this.endDragY;
      };
      return DragState;
    })();
    MouseEvent = (function() {
      function MouseEvent(wrappedEvent) {
        this.wrappedEvent = wrappedEvent;
        this.x = deviceCoordinateX(this.wrappedEvent);
        this.y = deviceCoordinateY(this.wrappedEvent);
      }
      MouseEvent.prototype.toString = function() {
        return "MouseEvent(x: " + this.x + ", y: " + this.y + ")";
      };
      return MouseEvent;
    })();
    MouseDraggedEvent = (function() {
      __extends(MouseDraggedEvent, MouseEvent);
      function MouseDraggedEvent(wrappedEvent, dragState) {
        this.wrappedEvent = wrappedEvent;
        this.dragState = dragState;
        MouseDraggedEvent.__super__.constructor.call(this, this.wrappedEvent);
        this.movementX = this.dragState.movementX;
        this.movementY = this.dragState.movementY;
      }
      MouseDraggedEvent.prototype.toString = function() {
        return "MouseDraggedEvent(x: " + this.x + ", y: " + this.y + ", movement: " + this.movementX + "/" + this.movementY + ")";
      };
      return MouseDraggedEvent;
    })();
    deviceCoordinateX = __bind(function(event) {
      var offset, _ref;
      offset = function(value) {
        return value - canvas.offsetLeft;
      };
      if (((_ref = event.touches) != null ? _ref.item(0) : void 0) != null) {
        return offset(event.touches[0].pageX);
      }
      if ((typeof dragState != "undefined" && dragState !== null) && (event.touches != null)) {
        return offset(dragState.endDragX);
      }
      if (event.pageX != null) {
        return offset(event.pageX);
      }
      throw "unable to determine x coordate for event: " + event;
    }, this);
    deviceCoordinateY = __bind(function(event) {
      var offset, _ref;
      offset = function(value) {
        return value - canvas.offsetTop;
      };
      if (((_ref = event.touches) != null ? _ref.item(0) : void 0) != null) {
        return offset(event.touches[0].pageY);
      }
      if ((typeof dragState != "undefined" && dragState !== null) && (event.touches != null)) {
        return offset(dragState.endDragY);
      }
      if (event.pageY != null) {
        return offset(event.pageY);
      }
      throw "unable to determine y coordate for event: " + event;
    }, this);
    canvas.captureRedraw = __bind(function(fn) {
      var originalRedraw, shouldRedraw;
      originalRedraw = canvas.redraw;
      shouldRedraw = false;
      canvas.redraw = function() {
        return shouldRedraw = true;
      };
      fn();
      if (shouldRedraw) {
        originalRedraw();
      }
      return canvas.redraw = originalRedraw;
    }, this);
    dragState = null;
    mouseMoveListeners = [];
    mouseDragListeners = [];
    mouseDragEndListeners = [];
    mouseDownListeners = [];
    mouseUpListeners = [];
    canvas.addMoveListener = function(fn) {
      return mouseMoveListeners.push(fn);
    };
    canvas.addDragListener = function(fn) {
      return mouseDragListeners.push(fn);
    };
    canvas.addDragEndListener = function(fn) {
      return mouseDragEndListeners.push(fn);
    };
    canvas.addDownListener = function(fn) {
      return mouseDownListeners.push(fn);
    };
    canvas.addUpListener = function(fn) {
      return mouseUpListeners.push(fn);
    };
    fire = function(event, listeners) {
      return canvas.captureRedraw(function() {
        var l, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = listeners.length; _i < _len; _i++) {
          l = listeners[_i];
          _results.push(l(event));
        }
        return _results;
      });
    };
    mouseMove = function(event) {
      if (dragState != null) {
        if (logging) {
          log.debug("firing mouse dragged event");
        }
        dragState.update(event);
        fire(new MouseDraggedEvent(event, dragState), mouseDragListeners);
      } else {
        if (logging) {
          log.debug("firing mouse moved event");
        }
        fire(new MouseEvent(event), mouseMoveListeners);
      }
      if (event.touches) {
        return event.preventDefault();
      }
    };
    mouseUp = function(event) {
      if (dragState != null ? dragState.hasMoved() : void 0) {
        if (logging) {
          log.debug("firing draged ended event");
        }
        fire(new MouseDraggedEvent(event, dragState), mouseDragEndListeners);
      } else {
        if (logging) {
          log.debug("firing mouse up event");
        }
        fire(new MouseEvent(event), mouseUpListeners);
      }
      dragState = null;
      if (event.touches) {
        return event.preventDefault();
      }
    };
    mouseOut = function(event) {
      if (dragState != null ? dragState.hasMoved() : void 0) {
        if (logging) {
          log.debug("firing draged ended event");
        }
        fire(new MouseDraggedEvent(event, dragState), mouseDragEndListeners);
      }
      return dragState = null;
    };
    mouseDown = function(event) {
      if (logging) {
        log.debug("firing mouse down event");
      }
      dragState = new DragState(event);
      fire(new MouseEvent(event), mouseDownListeners);
      if (event.touches) {
        return event.preventDefault();
      }
    };
    canvas[constants.supportsTouch ? 'ontouchmove' : 'onmousemove'] = mouseMove;
    canvas[constants.supportsTouch ? 'ontouchend' : 'onmouseup'] = mouseUp;
    canvas[constants.supportsTouch ? 'ontouchstart' : 'onmousedown'] = mouseDown;
    canvas['onmouseout'] = mouseOut;
    components = [];
    canvas.add = function(component) {
      return components.push(component) && this.sort();
    };
    canvas.sort = function() {
      return components.sort(function(left, right) {
        return left.z - right.z;
      });
    };
    canvas.redraw = function() {
      var c, _i, _len;
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (_i = 0, _len = components.length; _i < _len; _i++) {
        c = components[_i];
        c.draw();
      }
      return null;
    };
    return canvas;
  });
}).call(this);
