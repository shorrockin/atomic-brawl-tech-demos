define(function() {
  var Grid;
  return Grid = (function() {
    function Grid(board, horizontalIndex, verticalIndex) {
      var value;
      this.board = board;
      this.horizontalIndex = horizontalIndex;
      this.verticalIndex = verticalIndex;
      this.state = this.board.state;
      this.graphics = this.state.graphics;
      this.enabled = true;
      this.x = this.horizontalIndex * this.board.side;
      this.y = this.board.height * (2 * this.verticalIndex + (this.horizontalIndex % 2)) / 2;
      this.numCorners = 6;
      this.centerX = this.x + this.board.radius;
      this.centerY = this.y + (this.board.height / 2);
      this.cornersX = [this.board.radius / 2, this.board.side, this.board.width, this.board.side, this.board.radius / 2, 0];
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
      this.cornersY = [0, 0, this.board.height / 2, this.board.height, this.board.height, this.board.height / 2];
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
    Grid.prototype.toggle = function() {
      return this.enabled = !this.enabled;
    };
    Grid.prototype.draw = function() {
      var context, index, offsetX, offsetY, _ref;
      context = state.context;
      offsetX = state.offsetX;
      offsetY = state.offsetY;
      if (this.enabled) {
        context.drawImage(this.graphics.main, this.x + offsetX, this.y + offsetY);
      }
      if (this.enabled) {
        context.drawImage(this.graphics.bottom, this.x + offsetX, this.y + offsetY + state.graphics.main.height);
      }
      if (this.board.selected === this) {
        context.beginPath();
        context.moveTo(this.cornersX[0] + offsetX, this.cornersY[0] + offsetY);
        for (index = 1, _ref = this.numCorners; (1 <= _ref ? index < _ref : index > _ref); (1 <= _ref ? index += 1 : index -= 1)) {
          context.lineTo(this.cornersX[index] + offsetX, this.cornersY[index] + offsetY);
        }
        context.lineTo(this.cornersX[0] + offsetX, this.cornersY[0] + offsetY);
        context.font = "bold 25px sans-serif";
        context.fillStyle = "rgba(35,89,42,0.2)";
        context.fill();
        context.fillStyle = "rgba(255,255,255,0.2)";
        context.fillText("" + this.board.selected.horizontalIndex + "," + this.board.selected.verticalIndex, this.board.selected.centerX - 20 + offsetX, this.board.selected.centerY + 8 + offsetY);
        return context.closePath();
      }
    };
    return Grid;
  })();
});