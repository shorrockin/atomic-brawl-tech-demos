(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['constants', 'ui/images', 'logging'], function(constants, images, log) {
    var PathFindingState;
    PathFindingState = (function() {
      function PathFindingState(hexagon, p, end) {
        this.hexagon = hexagon;
        this.end = end;
        this.addNeighborsToOpenList = __bind(this.addNeighborsToOpenList, this);;
        this.hashKey = this.hexagon.hashKey;
        this.updateParent(p);
      }
      PathFindingState.prototype.updateParent = function(p) {
        this.parent = p;
        this.distanceFromStart = 0;
        if (this.parent) {
          this.distanceFromStart = this.parent.distanceFromStart + 1;
        }
        this.distanceToEnd = this.distanceFrom(this.end);
        return this.distance = this.distanceFromStart + this.distanceToEnd;
      };
      PathFindingState.prototype.distanceFrom = function(other) {
        var dx, dy;
        if (other instanceof PathFindingState) {
          dx = other.hexagon.x - this.hexagon.x;
          dy = other.hexagon.y - this.hexagon.y;
        } else {
          dx = other.x - this.hexagon.x;
          dy = other.y - this.hexagon.y;
        }
        return Math.sqrt((dx * dx) + (dy * dy));
      };
      PathFindingState.prototype.isHex = function(hex) {
        return hex.x === this.hexagon.x && hex.y === this.hexagon.y;
      };
      PathFindingState.prototype.addNeighborsToOpenList = function(openList, closedList) {
        var neighbor, _i, _len, _ref, _results;
        _ref = this.hexagon.neighbors;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          neighbor = _ref[_i];
          _results.push(neighbor.enabled && !closedList.hasOwnProperty(neighbor.hashKey) ? !openList.hasOwnProperty(neighbor.hashKey) ? openList[neighbor.hashKey] = new PathFindingState(neighbor, this, this.end) : openList[neighbor.hashKey].distanceFromStart < this.distanceFromStart ? openList[neighbor.hashKey].updateParent(this) : void 0 : void 0);
        }
        return _results;
      };
      return PathFindingState;
    })();
    return {
      path: function(from, to) {
        var cheapest, closedList, current, foundEnd, noPath, openList, path, pathFinding, starting;
        if (from.x === to.x && from.y === to.y) {
          return;
        }
        if (!from.enabled || !to.enabled) {
          return;
        }
        starting = new PathFindingState(from, null, to);
        current = starting;
        foundEnd = false;
        noPath = false;
        openList = {};
        closedList = {};
        openList[starting.hashKey] = starting;
        cheapest = function() {
          var cheapest, key, value;
          cheapest = null;
          for (key in openList) {
            value = openList[key];
            if (cheapest === null || value.distance < cheapest.distance) {
              cheapest = value;
            }
          }
          return cheapest;
        };
        pathFinding = function() {
          current = cheapest();
          if (current) {
            delete openList[current.hashKey];
            closedList[current.hashKey] = current;
            current.addNeighborsToOpenList(openList, closedList);
            if (current.isHex(to)) {
              return foundEnd = true;
            }
          } else {
            return noPath = true;
          }
        };
        while (!foundEnd && !noPath) {
          pathFinding();
        }
        if (noPath) {
          return;
        }
        path = [];
        while (current && current.parent !== null) {
          path.push(current.hexagon);
          current = current.parent;
        }
        return path.reverse();
      },
      gridAtMousePosition: __bind(function(x, y) {
        var cellIndexX, cellIndexY, cellX, cellY, tileIndexY, validateCoords, _ref;
        validateCoords = function(coords) {
          if (coords && (coords.x != null) && (coords.y != null)) {
            if (coords.x >= 0 && coords.x < constants.boardWidth) {
              if (coords.y >= 0 && coords.y < constants.boardHeight) {
                return coords;
              }
            }
          }
          return null;
        };
        cellIndexX = Math.floor(x / images.main.side);
        cellX = x - images.main.side * cellIndexX;
        tileIndexY = y - (cellIndexX % 2) * images.main.height / 2;
        cellIndexY = Math.floor(tileIndexY / images.main.height);
        cellY = tileIndexY - images.main.height * cellIndexY;
        if (cellX > Math.abs(images.main.radius / 2 - images.main.radius * cellY / images.main.height)) {
          return validateCoords({
            x: cellIndexX,
            y: cellIndexY
          });
        } else {
          return validateCoords({
            x: cellIndexX - 1,
            y: cellIndexY + (cellIndexX % 2) - ((_ref = cellY < images.main.height / 2) != null ? _ref : {
              1: 0
            })
          });
        }
      }, this),
      boardWidth: function() {
        return constants.boardWidth * images.main.side;
      },
      random: function(from, to) {
        return Math.floor(Math.random() * to) + from;
      },
      distanceFrom: function(a, b) {
        var dx, dy;
        dx = a.x - b.x;
        dy = a.y - b.y;
        return Math.sqrt((dx * dx) + (dy * dy));
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
