(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['constants', 'log', 'math', 'animator', 'ui/images', 'ui/ImageLayer'], function(constants, log, math, animator, images, ImageLayer) {
    var CharacterLayer;
    return CharacterLayer = (function() {
      __extends(CharacterLayer, ImageLayer);
      function CharacterLayer(character, parent) {
        this.character = character;
        this.executeMove = __bind(this.executeMove, this);;
        this.updatePath = __bind(this.updatePath, this);;
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
        var hex, path, start, _i, _len;
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
          this.path = path;
          this.updatePath(0);
          return animator.addListener(this.executeMove);
        } else {
          return log.warn("unable to find path from " + start + " to " + end);
        }
      };
      CharacterLayer.prototype.updatePath = function(index) {
        if (this.path && index >= this.path.length) {
          animator.removeListener(this.executeMove);
          return this.path = null;
        } else {
          this.path.index = index;
          this.path.to = math.gridPosition(this.path[index].x, this.path[index].y);
          this.path.to.x = this.adjustXForImage(this.path.to.x);
          this.path.to.y = this.adjustYForImage(this.path.to.y);
          this.path.dx = Math.abs(this.position.x - this.path.to.x);
          this.path.dy = Math.abs(this.position.y - this.path.to.y);
          this.path.mx = 0;
          this.path.my = 0;
          this.path.xDirection = (this.path.to.x > this.position.x ? 1 : -1);
          return this.path.yDirection = (this.path.to.y > this.position.y ? 1 : -1);
        }
      };
      CharacterLayer.prototype.executeMove = function() {
        var mx, my;
        this.path.angle = Math.atan(this.path.dy / this.path.dx);
        mx = Math.round(Math.cos(this.path.angle) * constants.characterSpeed);
        my = Math.round(Math.sin(this.path.angle) * constants.characterSpeed);
        this.path.mx = this.path.mx + mx;
        this.path.my = this.path.my + my;
        if (this.path.mx >= this.path.dx && this.path.my >= this.path.dy) {
          this.position.set(this.path.to.x, this.path.to.y);
          this.path[this.path.index].select(false);
          return this.updatePath(this.path.index + 1);
        } else {
          return this.position.move(mx * this.path.xDirection, my * this.path.yDirection);
        }
      };
      return CharacterLayer;
    })();
  });
}).call(this);
