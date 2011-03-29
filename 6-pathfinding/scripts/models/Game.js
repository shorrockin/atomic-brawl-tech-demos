(function() {
  define(['models/Hexagon', 'models/Character', 'constants', 'logging'], function(Hexagon, Character, constants, log) {
    var Game;
    return Game = (function() {
      function Game() {
        var h, row, x, y, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3, _ref4;
        log.debug('initializing new game object');
        this.hexagons = [];
        this.character = new Character(constants.characterStart[0], constants.characterStart[1]);
        for (x = 0, _ref = constants.boardWidth; (0 <= _ref ? x < _ref : x > _ref); (0 <= _ref ? x += 1 : x -= 1)) {
          row = [];
          for (y = 0, _ref2 = constants.boardHeight; (0 <= _ref2 ? y < _ref2 : y > _ref2); (0 <= _ref2 ? y += 1 : y -= 1)) {
            row.push(new Hexagon(x, y, this));
          }
          this.hexagons.push(row);
        }
        _ref3 = constants.disableGrids;
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          x = _ref3[_i];
          this.hexagons[x[0]][x[1]].enable(false);
        }
        _ref4 = this.hexagons;
        for (_j = 0, _len2 = _ref4.length; _j < _len2; _j++) {
          row = _ref4[_j];
          for (_k = 0, _len3 = row.length; _k < _len3; _k++) {
            h = row[_k];
            h.populateNeighbors();
          }
        }
      }
      Game.prototype.hexAt = function(x, y) {
        if (x < 0 || y < 0 || x >= constants.boardWidth || y >= constants.boardHeight) {
          return;
        }
        return this.hexagons[x][y];
      };
      return Game;
    })();
  });
}).call(this);
