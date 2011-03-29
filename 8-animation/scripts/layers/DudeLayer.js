(function() {
  var req;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  req = [];
  req.push('constants');
  req.push('ui/images');
  req.push('math');
  req.push('ui/ImageLayer');
  req.push('ui/WaypointAnimation');
  req.push('ui/ConstantVelocity');
  define(req, function(constants, images, math, ImageLayer, WaypointAnimation, ConstantVelocity) {
    var DudeLayer, DudeWaypoint;
    DudeWaypoint = (function() {
      function DudeWaypoint(hex, dude) {
        var to;
        this.hex = hex;
        to = math.gridPosition(this.hex.x, this.hex.y);
        this.x = dude.adjustXForImage(to.x);
        this.y = dude.adjustYForImage(to.y);
      }
      return DudeWaypoint;
    })();
    return DudeLayer = (function() {
      __extends(DudeLayer, ImageLayer);
      function DudeLayer(parent, id, hexagons) {
        this.hexagons = hexagons;
        this.setRandomAnimation = __bind(this.setRandomAnimation, this);;
        DudeLayer.__super__.constructor.call(this, "dude_layer_" + id, images.character, parent);
        this.x = constants.dudeStart[0];
        this.y = constants.dudeStart[1];
        this.dimensions.set(images.character.width, images.character.height, 99999);
        this.setRandomAnimation();
      }
      DudeLayer.prototype.setRandomAnimation = function() {
        var p, path, toX, toY;
        this.updatePosition();
        toX = math.random(0, constants.boardWidth);
        toY = math.random(0, constants.boardHeight);
        if (this.hexagons[toX][toY].enabled) {
          path = math.path(this.hexagons[this.x][this.y], this.hexagons[toX][toY]);
          if (path) {
            this.x = this.hexagons[toX][toY].x;
            this.y = this.hexagons[toX][toY].y;
            path = (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = path.length; _i < _len; _i++) {
                p = path[_i];
                _results.push(new DudeWaypoint(p, this));
              }
              return _results;
            }).call(this);
            this.animation = new WaypointAnimation(this, path, new ConstantVelocity(constants.dudeSpeed));
            this.animation.addStopListener(this.setRandomAnimation);
            return null;
          }
        }
        return this.setRandomAnimation();
      };
      DudeLayer.prototype.updatePosition = function() {
        var gridPosition;
        gridPosition = math.gridPosition(this.x, this.y);
        gridPosition.x = this.adjustXForImage(gridPosition.x);
        gridPosition.y = this.adjustYForImage(gridPosition.y);
        return this.position.set(gridPosition.x, gridPosition.y);
      };
      DudeLayer.prototype.adjustXForImage = function(value) {
        return value + (images.main.width / 2) - (images.character.width / 2);
      };
      DudeLayer.prototype.adjustYForImage = function(value) {
        return value + (images.main.height / 2) - images.character.height;
      };
      return DudeLayer;
    })();
  });
}).call(this);
