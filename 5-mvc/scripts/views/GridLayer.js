(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['views/Layer', 'views/HexagonView', 'constants', 'models/images', 'math', 'logging'], function(Layer, HexagonView, constants, images, math, log) {
    var GridLayer;
    return GridLayer = (function() {
      __extends(GridLayer, Layer);
      function GridLayer(hexagons) {
        var column, hexagon, row, view, x, _i, _j, _k, _len, _len2, _len3, _ref;
        this.hexagons = hexagons;
        this.viewAt = __bind(this.viewAt, this);;
        GridLayer.__super__.constructor.call(this, "grid-layer", 1, math.boardWidth(), math.boardHeight(), 1);
        this.views = [];
        for (_i = 0, _len = hexagons.length; _i < _len; _i++) {
          column = hexagons[_i];
          row = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = column.length; _i < _len; _i++) {
              hexagon = column[_i];
              _results.push(new HexagonView(hexagon));
            }
            return _results;
          })();
          this.views.push(row);
          for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
            view = row[_j];
            this.addComponent(view);
          }
        }
        _ref = constants.disableGrids;
        for (_k = 0, _len3 = _ref.length; _k < _len3; _k++) {
          x = _ref[_k];
          this.viewAt(x[0], x[1]).enable(false);
        }
        this.addDragListener(__bind(function(event) {
          this.updateOffsets(this.offsetX + (event.movementX * 2), this.offsetY + (event.movementY * 2));
          return this.redraw();
        }, this));
        this.addUpListener(__bind(function(event) {
          var coords, over;
          coords = math.gridAtMousePosition(event.x - this.offsetX, event.y - this.offsetY);
          over = this.viewAt(coords.x, coords.y);
          if (over) {
            over.enable(!over.enabled);
            return this.redraw();
          }
        }, this));
      }
      GridLayer.prototype.viewAt = function(x, y) {
        if (x < 0 || y < 0 || x >= this.hexagons.length || y >= this.hexagons[x].length) {
          return;
        }
        return this.views[x][y];
      };
      return GridLayer;
    })();
  });
}).call(this);
