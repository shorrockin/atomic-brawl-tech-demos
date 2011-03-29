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
        var column, h, row, view, _i, _j, _len, _len2;
        this.hexagons = hexagons;
        this.gridLayer = gridLayer;
        this.viewAt = __bind(this.viewAt, this);;
        GridHighlightLayer.__super__.constructor.call(this, "grid-highlights", 1, this.gridLayer, 1);
        this.selected = null;
        this.views = [];
        for (_i = 0, _len = hexagons.length; _i < _len; _i++) {
          column = hexagons[_i];
          row = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = column.length; _i < _len; _i++) {
              h = column[_i];
              _results.push(new HexagonHighlightView(h));
            }
            return _results;
          })();
          this.views.push(row);
          for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
            view = row[_j];
            this.addComponent(view);
          }
        }
        this.addMoveListener(__bind(function(event) {
          var coords, over;
          coords = math.gridAtMousePosition(event.x - this.offsetX, event.y - this.offsetY);
          over = this.viewAt(coords.x, coords.y);
          if (over !== this.selected) {
            if (this.selected) {
              this.selected.select(false);
            }
            if (over) {
              over.select(true);
            }
            this.selected = over;
            return this.redraw();
          }
        }, this));
      }
      GridHighlightLayer.prototype.viewAt = function(x, y) {
        if (x < 0 || y < 0 || x >= this.hexagons.length || y >= this.hexagons[x].length) {
          return;
        }
        return this.views[x][y];
      };
      return GridHighlightLayer;
    })();
  });
}).call(this);
