(function() {
  this.HexaBoard = (function() {
    function HexaBoard(image, width, height, radius) {
      var x, y, _ref, _ref2;
      this.image = image;
      this.width = width;
      this.height = height;
      this.radius = radius;
      this.grid = [];
      this.pixelWidth = this.radius * 2;
      this.pixelHeight = Math.round(this.radius * Math.sqrt(3) * 0.6);
      this.side = this.radius * 3 / 2;
      this.selected = null;
      for (x = 0, _ref = this.width; (0 <= _ref ? x < _ref : x > _ref); (0 <= _ref ? x += 1 : x -= 1)) {
        this.grid.push([]);
        for (y = 0, _ref2 = this.height; (0 <= _ref2 ? y < _ref2 : y > _ref2); (0 <= _ref2 ? y += 1 : y -= 1)) {
          this.grid[x].push(new HexaGrid(this, this.image, this.radius, x, y));
        }
      }
    }
    HexaBoard.prototype.each = function(fn) {
      var x, y, _ref, _ref2, _results;
      _results = [];
      for (y = 0, _ref = this.height; (0 <= _ref ? y < _ref : y > _ref); (0 <= _ref ? y += 1 : y -= 1)) {
        for (x = 0, _ref2 = this.width; (0 <= _ref2 ? x < _ref2 : x > _ref2); x += 2) {
          fn(this.at(x, y));
        }
        _results.push((function() {
          var _ref, _results;
          _results = [];
          for (x = 1, _ref = this.width; (1 <= _ref ? x < _ref : x > _ref); x += 2) {
            _results.push(fn(this.at(x, y)));
          }
          return _results;
        }).call(this));
      }
      return _results;
    };
    HexaBoard.prototype.toggle = function(x, y) {
      var selected;
      selected = this.at(x, y);
      if (selected != null) {
        selected.toggle();
      }
      return this;
    };
    HexaBoard.prototype.toggleAtPoint = function(x, y) {
      var selected;
      selected = this.atPoint(x, y);
      if (selected != null) {
        selected.toggle();
      }
      return this;
    };
    HexaBoard.prototype.at = function(x, y) {
      if (x >= this.grid.length || y >= this.grid[0].length || x < 0 || y < 0) {
        return;
      }
      return this.grid[x][y];
    };
    HexaBoard.prototype.enableAtPoint = function(x, y) {
      return this.selected = this.atPoint(x, y);
    };
    HexaBoard.prototype.atPoint = function(x, y) {
      var cellIndexX, cellIndexY, cellX, cellY, tileIndexY, _ref;
      cellIndexX = Math.floor(x / this.side);
      cellX = x - this.side * cellIndexX;
      tileIndexY = y - (cellIndexX % 2) * this.pixelHeight / 2;
      cellIndexY = Math.floor(tileIndexY / this.pixelHeight);
      cellY = tileIndexY - this.pixelHeight * cellIndexY;
      if (cellX > Math.abs(this.radius / 2 - this.radius * cellY / this.pixelHeight)) {
        return this.at(cellIndexX, cellIndexY);
      } else {
        return this.at(cellIndexX - 1, cellIndexY + (cellIndexX % 2) - ((_ref = cellY < this.pixelHeight / 2) != null ? _ref : {
          1: 0
        }));
      }
    };
    return HexaBoard;
  })();
  this.HexaGrid = (function() {
    function HexaGrid(board, image, radius, horizontalIndex, verticalIndex) {
      var value;
      this.board = board;
      this.image = image;
      this.radius = radius;
      this.horizontalIndex = horizontalIndex;
      this.verticalIndex = verticalIndex;
      this.enabled = true;
      this.x = this.horizontalIndex * this.board.side;
      this.y = this.board.pixelHeight * (2 * this.verticalIndex + (this.horizontalIndex % 2)) / 2;
      this.numCorners = 6;
      this.centerX = this.x + this.radius;
      this.centerY = this.y + (this.board.pixelHeight / 2);
      this.cornersX = [this.radius / 2, this.board.side, this.board.pixelWidth, this.board.side, this.radius / 2, 0];
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
      this.cornersY = [0, 0, this.board.pixelHeight / 2, this.board.pixelHeight, this.board.pixelHeight, this.board.pixelHeight / 2];
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
    HexaGrid.prototype.toggle = function() {
      return this.enabled = !this.enabled;
    };
    HexaGrid.prototype.draw = function(context) {
      var index, _ref;
      if (this.enabled) {
        context.drawImage(this.image, this.x, this.y);
      }
      if (this.board.selected === this) {
        context.beginPath();
        context.moveTo(this.cornersX[0] + context.offsetX, this.cornersY[0] + context.offsetY);
        for (index = 1, _ref = this.numCorners; (1 <= _ref ? index < _ref : index > _ref); (1 <= _ref ? index += 1 : index -= 1)) {
          context.lineTo(this.cornersX[index] + context.offsetX, this.cornersY[index] + context.offsetY);
        }
        context.lineTo(this.cornersX[0] + context.offsetX, this.cornersY[0] + context.offsetY);
        context.font = "bold 25px sans-serif";
        context.fillStyle = "rgba(35,89,42,0.2)";
        context.fill();
        context.fillStyle = "rgba(255,255,255,0.2)";
        context.fillText("" + this.board.selected.horizontalIndex + "," + this.board.selected.verticalIndex, this.board.selected.centerX - 20 + context.offsetX, this.board.selected.centerY + 8 + context.offsetY);
        return context.closePath();
      }
    };
    return HexaGrid;
  })();
}).call(this);
