(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['constants', 'log', 'math', 'animator', 'ui/images', 'ui/ImageLayer', 'ui/WaypointAnimation', 'ui/ConstantVelocity'], function(constants, log, math, animator, images, ImageLayer, WaypointAnimation, ConstantVelocity) {
    var CharacterLayer, CharacterWaypoint;
    CharacterWaypoint = (function() {
      function CharacterWaypoint(hex, character) {
        var to;
        this.hex = hex;
        this.reached = __bind(this.reached, this);;
        to = math.gridPosition(this.hex.x, this.hex.y);
        this.x = character.adjustXForImage(to.x);
        this.y = character.adjustYForImage(to.y);
      }
      CharacterWaypoint.prototype.reached = function() {
        return this.hex.select(false);
      };
      return CharacterWaypoint;
    })();
    return CharacterLayer = (function() {
      __extends(CharacterLayer, ImageLayer);
      function CharacterLayer(character, parent) {
        this.character = character;
        CharacterLayer.__super__.constructor.call(this, "character_layer", images.character, parent);
        this.dimensions.set(images.character.width, images.character.height, 99999);
        this.updatePosition();
        this.path = null;
      }
      CharacterLayer.prototype.updatePosition = function() {
        var gridPosition;
        gridPosition = math.gridPosition(this.character.x, this.character.y);
        gridPosition.x = this.adjustXForImage(gridPosition.x);
        gridPosition.y = this.adjustYForImage(gridPosition.y);
        return this.position.set(gridPosition.x, gridPosition.y);
      };
      CharacterLayer.prototype.adjustXForImage = function(value) {
        return value + (images.main.width / 2) - (images.character.width / 2);
      };
      CharacterLayer.prototype.adjustYForImage = function(value) {
        return value + (images.main.height / 2) - images.character.height;
      };
      CharacterLayer.prototype.moving = function() {
        return this.path !== null;
      };
      CharacterLayer.prototype.hexagonLayer = function() {
        return this.parent.hexagonLayerAt(this.character.x, this.character.y);
      };
      CharacterLayer.prototype.moveTo = function(end) {
        var hex, p, path, start, _i, _len;
        start = this.hexagonLayer().hexagon;
        path = math.path(start, end);
        if (path) {
          start.select(false);
          for (_i = 0, _len = path.length; _i < _len; _i++) {
            hex = path[_i];
            hex.select(true);
          }
          this.character.x = end.x;
          this.character.y = end.y;
          path = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = path.length; _i < _len; _i++) {
              p = path[_i];
              _results.push(new CharacterWaypoint(p, this));
            }
            return _results;
          }).call(this);
          return new WaypointAnimation(this, path, new ConstantVelocity(constants.characterSpeed));
        }
      };
      return CharacterLayer;
    })();
  });
}).call(this);
