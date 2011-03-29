(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['constants', 'ui/images', 'ui/ImageLayer', 'ui/Layer', 'log', 'math'], function(constants, images, ImageLayer, Layer, log, math) {
    var HexagonBottomLayer, HexagonHighlightLayer, HexagonLayer, HexagonTopLayer;
    HexagonTopLayer = (function() {
      __extends(HexagonTopLayer, ImageLayer);
      function HexagonTopLayer(hexagon, parent) {
        this.hexagon = hexagon;
        HexagonTopLayer.__super__.constructor.call(this, "hexagon_top_" + this.hexagon.x + "_" + this.hexagon.y, images.main, parent);
      }
      return HexagonTopLayer;
    })();
    HexagonBottomLayer = (function() {
      __extends(HexagonBottomLayer, ImageLayer);
      function HexagonBottomLayer(hexagon, parent) {
        this.hexagon = hexagon;
        HexagonBottomLayer.__super__.constructor.call(this, "hexagon_bottom_" + this.hexagon.x + "_" + this.hexagon.y, images.bottom, parent);
        this.position.set(0, images.main.height);
      }
      HexagonBottomLayer.prototype.enabled = function() {
        var _ref, _ref2, _ref3;
        return !((_ref = this.hexagon.south) != null ? _ref.enabled : void 0) || !((_ref2 = this.hexagon.southWest) != null ? _ref2.enabled : void 0) || !((_ref3 = this.hexagon.southEast) != null ? _ref3.enabled : void 0);
      };
      return HexagonBottomLayer;
    })();
    HexagonHighlightLayer = (function() {
      __extends(HexagonHighlightLayer, Layer);
      function HexagonHighlightLayer(hexagon, parent) {
        this.hexagon = hexagon;
        HexagonHighlightLayer.__super__.constructor.call(this, "hexagon_highlight_" + this.hexagon.x + "_" + this.hexagon.y, parent);
        this.dimensions.set(images.main.width, images.main.height, 1);
      }
      HexagonHighlightLayer.prototype.enabled = function() {
        return this.parent.hovered() || this.parent.selected();
      };
      HexagonHighlightLayer.prototype.redraw = function() {
        this.beginPath();
        this.moveTo(images.main.radius / 2, 0);
        this.lineTo(images.main.side, 0);
        this.lineTo(images.main.width, images.main.height / 2);
        this.lineTo(images.main.side, images.main.height);
        this.lineTo(images.main.radius / 2, images.main.height);
        this.lineTo(0, images.main.height / 2);
        if (this.parent.hovered()) {
          this.fillStyle(constants.gridFillColorHighlighted);
          this.fill();
        }
        if (this.parent.selected()) {
          this.fillStyle(constants.gridFillColorSelected);
          this.fill();
        }
        this.fillStyle(constants.gridFontColor);
        this.font(constants.gridFont);
        this.fillText("" + this.hexagon.x + "," + this.hexagon.y, (images.main.width / 2) + constants.gridTextOffset.x, (images.main.height / 2) + constants.gridTextOffset.y);
        return this.closePath();
      };
      return HexagonHighlightLayer;
    })();
    return HexagonLayer = (function() {
      __extends(HexagonLayer, Layer);
      function HexagonLayer(hexagon, parent) {
        var pos;
        this.hexagon = hexagon;
        HexagonLayer.__super__.constructor.call(this, "hexagon_" + this.hexagon.x + "_" + this.hexagon.y, parent);
        pos = math.gridPosition(this.hexagon.x, this.hexagon.y);
        this.position.set(pos.x, pos.y);
        this.dimensions.set(images.main.width, images.main.height + images.bottom.height, pos.z);
        this.top = new HexagonTopLayer(this.hexagon, this);
        this.bottom = new HexagonBottomLayer(this.hexagon, this);
        this.highlight = new HexagonHighlightLayer(this.hexagon, this);
        this.hexagon.addEnableListener(__bind(function() {
          return this.markDirty();
        }, this));
        this.hexagon.addSelectionListener(__bind(function() {
          return this.top.markDirty();
        }, this));
      }
      HexagonLayer.prototype.enabled = function() {
        return this.hexagon.enabled;
      };
      HexagonLayer.prototype.hovered = function() {
        return this.parent.hovered === this;
      };
      HexagonLayer.prototype.selected = function() {
        return this.hexagon.selected;
      };
      HexagonLayer.prototype.toString = function() {
        return "HexagonLayer[hex: " + this.hexagon + ", pos: " + this.position + ", dim: " + this.dimensions + "]";
      };
      return HexagonLayer;
    })();
  });
}).call(this);
