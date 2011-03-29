var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
require(["jquery", "logging", "classes/Graphics", "classes/State"], function($, log, Graphics, State) {
  var eventX, eventY, mouseDown, mouseMove, mouseUp, redrawCanvas;
  $(document).ready(__bind(function() {
    log.debug("loading graphic set");
    return this.graphics = new Graphics("images/hex_tile_top.png", "images/hex_tile_bottom.png", __bind(function() {
      var board, canvas;
      log.debug("graphic set loaded");
      canvas = $("#canvas")[0];
      this.state = new State(canvas, 12, 11, this.graphics);
      board = this.state.board;
      log.debug("touch supported: " + this.state.supportsTouch);
      board.toggle(0, 0).toggle(1, 0).toggle(2, 0).toggle(0, 1);
      board.toggle(6, 0).toggle(7, 0).toggle(8, 0).toggle(9, 0).toggle(10, 0).toggle(11, 0);
      board.toggle(8, 1).toggle(9, 1).toggle(10, 1).toggle(11, 1).toggle(10, 2).toggle(11, 2);
      board.toggle(0, 8).toggle(0, 9).toggle(0, 10).toggle(1, 8).toggle(1, 9).toggle(1, 10);
      board.toggle(2, 9).toggle(2, 10).toggle(3, 9).toggle(3, 10).toggle(4, 10);
      board.toggle(5, 10).toggle(11, 9).toggle(9, 10).toggle(10, 10).toggle(11, 10);
      redrawCanvas();
      canvas[this.state.supportsTouch ? 'ontouchmove' : 'onmousemove'] = mouseMove;
      canvas[this.state.supportsTouch ? 'ontouchend' : 'onmouseup'] = mouseUp;
      return canvas[this.state.supportsTouch ? 'ontouchstart' : 'onmousedown'] = mouseDown;
    }, this));
  }, this));
  mouseMove = __bind(function(event) {
    var deltaX, deltaY;
    if (this.state.dragging) {
      deltaX = this.state.dragging.startX - eventX(event);
      deltaY = this.state.dragging.startY - eventY(event);
      this.state.offsetX = this.state.offsetX - deltaX;
      this.state.offsetY = this.state.offsetY - deltaY;
      this.state.dragging = {
        startX: eventX(event),
        startY: eventY(event),
        hasDragged: true
      };
      if (event.touches) {
        event.preventDefault();
      }
      return redrawCanvas();
    } else {
      this.state.board.enableAtPoint(eventX(event) - this.state.offsetX, eventY(event) - this.state.offsetY);
      return redrawCanvas();
    }
  }, this);
  mouseUp = __bind(function(event) {
    if (!(this.state.dragging && this.state.dragging.hasDragged)) {
      this.state.board.toggleAtPoint(eventX(event) - this.state.offsetX, eventY(event) - this.state.offsetY);
      redrawCanvas();
    }
    return this.state.dragging = false;
  }, this);
  mouseDown = __bind(function(event) {
    log.debug("mouse down detected, starting potential drag event");
    return this.state.dragging = {
      startX: eventX(event),
      startY: eventY(event),
      hasDragged: false
    };
  }, this);
  eventX = function(event) {
    var out, _ref, _ref2;
    out = event.pageX;
    if (((_ref = event.touches) != null ? _ref.item(0) : void 0) != null) {
      out = event.touches[0].pageX;
    }
    if ((event.touches != null) && !((_ref2 = event.touches) != null ? _ref2.item(0) : void 0)) {
      out = this.state.dragging.startX;
    }
    return out;
  };
  eventY = function(event) {
    var out, _ref, _ref2;
    out = event.pageY;
    if (((_ref = event.touches) != null ? _ref.item(0) : void 0) != null) {
      out = event.touches[0].pageY;
    }
    if ((event.touches != null) && !((_ref2 = event.touches) != null ? _ref2.item(0) : void 0)) {
      out = this.state.dragging.startY;
    }
    return out;
  };
  return redrawCanvas = function() {
    this.state.context.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    return this.state.board.each(__bind(function(grid) {
      return grid.draw();
    }, this));
  };
});