define(["classes/Grid"], function(Grid) {
  var Board;
  return Board = (function() {
    function Board(gridWidth, gridHeight, state) {
      var x, y, _ref, _ref2;
      this.gridWidth = gridWidth;
      this.gridHeight = gridHeight;
      this.state = state;
      this.grid = [];
      this.graphics = this.state.graphics;
      this.width = this.graphics.width();
      this.height = this.graphics.height();
      this.side = this.graphics.side();
      this.radius = this.graphics.radius();
      this.selected = null;
      for (x = 0, _ref = this.gridWidth; (0 <= _ref ? x < _ref : x > _ref); (0 <= _ref ? x += 1 : x -= 1)) {
        this.grid.push([]);
        for (y = 0, _ref2 = this.gridHeight; (0 <= _ref2 ? y < _ref2 : y > _ref2); (0 <= _ref2 ? y += 1 : y -= 1)) {
          this.grid[x].push(new Grid(this, x, y));
        }
      }
    }
    Board.prototype.each = function(fn) {
      var x, y, _ref, _ref2, _results;
      _results = [];
      for (y = 0, _ref = this.gridHeight; (0 <= _ref ? y < _ref : y > _ref); (0 <= _ref ? y += 1 : y -= 1)) {
        for (x = 0, _ref2 = this.gridWidth; (0 <= _ref2 ? x < _ref2 : x > _ref2); x += 2) {
          fn(this.at(x, y));
        }
        _results.push((function() {
          var _ref, _results;
          _results = [];
          for (x = 1, _ref = this.gridWidth; (1 <= _ref ? x < _ref : x > _ref); x += 2) {
            _results.push(fn(this.at(x, y)));
          }
          return _results;
        }).call(this));
      }
      return _results;
    };
    Board.prototype.toggle = function(x, y) {
      var selected;
      selected = this.at(x, y);
      if (selected != null) {
        selected.toggle();
      }
      return this;
    };
    Board.prototype.toggleAtPoint = function(x, y) {
      var selected;
      selected = this.atPoint(x, y);
      if (selected != null) {
        selected.toggle();
      }
      return this;
    };
    Board.prototype.at = function(x, y) {
      if (x >= this.grid.length || y >= this.grid[0].length || x < 0 || y < 0) {
        return;
      }
      return this.grid[x][y];
    };
    Board.prototype.enableAtPoint = function(x, y) {
      return this.selected = this.atPoint(x, y);
    };
    Board.prototype.atPoint = function(x, y) {
      var cellIndexX, cellIndexY, cellX, cellY, tileIndexY, _ref;
      cellIndexX = Math.floor(x / this.side);
      cellX = x - this.side * cellIndexX;
      tileIndexY = y - (cellIndexX % 2) * this.height / 2;
      cellIndexY = Math.floor(tileIndexY / this.height);
      cellY = tileIndexY - this.height * cellIndexY;
      console.log("" + cellIndexX + " / " + cellX + " / " + tileIndexY + " / " + cellIndexY + " / " + cellY);
      console.log("value: " + (Math.abs(this.radius / 2 - this.radius * cellY / this.height)));
      if (cellX > Math.abs(this.radius / 2 - this.radius * cellY / this.height)) {
        console.log("normal");
        return this.at(cellIndexX, cellIndexY);
      } else {
        console.log("f'd");
        return this.at(cellIndexX - 1, cellIndexY + (cellIndexX % 2) - ((_ref = cellY < this.height / 2) != null ? _ref : {
          1: 0
        }));
      }
    };
    return Board;
  })();
});