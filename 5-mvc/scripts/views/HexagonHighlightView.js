(function() {
  define(['constants', 'models/images', 'logging'], function(constants, images, log) {
    var HexagonHighlightView;
    return HexagonHighlightView = (function() {
      function HexagonHighlightView(hexagon) {
        var value;
        this.hexagon = hexagon;
        this.selected = false;
        this.z = 1;
        this.x = this.hexagon.x * images.main.side;
        this.y = images.main.height * (2 * this.hexagon.y + (this.hexagon.x % 2)) / 2;
        this.centerX = this.x + images.main.radius;
        this.centerY = this.y + (images.main.height / 2);
        this.cornersX = [images.main.radius / 2, images.main.side, images.main.width, images.main.side, images.main.radius / 2, 0];
        this.cornersX = (function() {
          var _i, _len, _ref, _results;
          _ref = this.cornersX;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            value = _ref[_i];
            _results.push(value + this.x);
          }
          return _results;
        }).call(this);
        this.cornersY = [0, 0, images.main.height / 2, images.main.height, images.main.height, images.main.height / 2];
        this.cornersY = (function() {
          var _i, _len, _ref, _results;
          _ref = this.cornersY;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            value = _ref[_i];
            _results.push(value + this.y);
          }
          return _results;
        }).call(this);
      }
      HexagonHighlightView.prototype.select = function(value) {
        return this.selected = value;
      };
      HexagonHighlightView.prototype.toString = function() {
        return "HexagonHighlightView(x: " + this.hexagon.x + ", y: " + this.hexagon.y + ", z: " + this.z + ")";
      };
      HexagonHighlightView.prototype.draw = function(context) {
        var index;
        if (this.selected) {
          context.beginPath();
          context.moveTo(this.cornersX[0], this.cornersY[0]);
          for (index = 1; index < 6; index++) {
            context.lineTo(this.cornersX[index], this.cornersY[index]);
          }
          context.lineTo(this.cornersX[0], this.cornersY[0]);
          context.fillStyle = constants.gridFillColor;
          context.fill();
          context.fillStyle = constants.gridFontColor;
          context.font = constants.gridFont;
          context.fillText("" + this.hexagon.x + "," + this.hexagon.y, this.centerX + constants.gridTextOffsetX, this.centerY + constants.gridTextOffsetY);
          return context.closePath();
        }
      };
      return HexagonHighlightView;
    })();
  });
}).call(this);
