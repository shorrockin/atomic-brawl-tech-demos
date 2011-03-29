(function() {
  define(['constants', 'models/images'], function(constants, images) {
    return {
      gridAtMousePosition: function(x, y) {
        var cellIndexX, cellIndexY, cellX, cellY, tileIndexY, _ref;
        cellIndexX = Math.floor(x / images.main.side);
        cellX = x - images.main.side * cellIndexX;
        tileIndexY = y - (cellIndexX % 2) * images.main.height / 2;
        cellIndexY = Math.floor(tileIndexY / images.main.height);
        cellY = tileIndexY - images.main.height * cellIndexY;
        if (cellX > Math.abs(images.main.radius / 2 - images.main.radius * cellY / images.main.height)) {
          return {
            x: cellIndexX,
            y: cellIndexY
          };
        } else {
          return {
            x: cellIndexX - 1,
            y: cellIndexY + (cellIndexX % 2) - ((_ref = cellY < images.main.height / 2) != null ? _ref : {
              1: 0
            })
          };
        }
      },
      boardWidth: function() {
        return constants.boardWidth * images.main.width;
      },
      boardHeight: function() {
        return (constants.boardHeight * images.main.height) + (images.main.height / 2) + images.bottom.height;
      },
      gridPosition: function(x, y) {
        return {
          x: x * images.main.side,
          y: images.main.height * (2 * y + (x % 2)) / 2,
          z: y * 10 + (x % 2)
        };
      }
    };
  });
}).call(this);
