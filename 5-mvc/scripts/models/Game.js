(function() {
  define(['models/Hexagon', 'constants', 'logging'], function(Hexagon, constants, log) {
    var Game;
    return Game = (function() {
      function Game() {
        var row, x, y, _ref, _ref2;
        log.debug('initializing new game object');
        this.hexagons = [];
        for (x = 0, _ref = constants.boardWidth; (0 <= _ref ? x < _ref : x > _ref); (0 <= _ref ? x += 1 : x -= 1)) {
          row = [];
          for (y = 0, _ref2 = constants.boardHeight; (0 <= _ref2 ? y < _ref2 : y > _ref2); (0 <= _ref2 ? y += 1 : y -= 1)) {
            row.push(new Hexagon(x, y));
          }
          this.hexagons.push(row);
        }
      }
      return Game;
    })();
  });
}).call(this);
