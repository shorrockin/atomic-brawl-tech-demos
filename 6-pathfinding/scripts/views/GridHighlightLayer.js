(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['views/BoundLayer', 'views/HexagonHighlightView', 'constants', 'math', 'models/images', 'logging'], function(BoundLayer, HexagonHighlightView, constants, math, images, log) {
    var GridHighlightLayer;
    return GridHighlightLayer = (function() {
      __extends(GridHighlightLayer, BoundLayer);
      function GridHighlightLayer(hexagons, gridLayer) {
        var column, hexagon, view, _i, _j, _len, _len2;
        this.hexagons = hexagons;
        this.gridLayer = gridLayer;
        this.onMove = __bind(this.onMove, this);;
        GridHighlightLayer.__super__.constructor.call(this, "grid-highlights", 1, this.gridLayer, 1);
        this.highlighted = null;
        for (_i = 0, _len = hexagons.length; _i < _len; _i++) {
          column = hexagons[_i];
          for (_j = 0, _len2 = column.length; _j < _len2; _j++) {
            hexagon = column[_j];
            view = new HexagonHighlightView(hexagon);
            hexagon.addSelectionListener(this.redraw);
            hexagon.addHighlightListener(this.redraw);
            this.addComponent(view);
          }
        }
        this.addMoveListener(this.onMove);
      }
      GridHighlightLayer.prototype.onMove = function(event) {
        var coords, over;
        coords = math.gridAtMousePosition(event.x - this.offsetX, event.y - this.offsetY);
        if (coords) {
          over = this.hexagons[coords.x][coords.y];
          if (over !== this.highlighted) {
            if (this.highlighted) {
              this.highlighted.highlight(false);
            }
            if (over) {
              over.highlight(true);
            }
            return this.highlighted = over;
          }
        } else if (this.highlighted) {
          if (this.highlighted) {
            this.highlighted.highlight(false);
          }
          return this.highlighted = null;
        }
      };
      return GridHighlightLayer;
    })();
  });
}).call(this);
