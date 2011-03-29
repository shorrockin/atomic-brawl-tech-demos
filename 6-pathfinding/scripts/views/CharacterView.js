(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['constants', 'models/images', 'logging', 'math', 'animator'], function(constants, images, log, math, animator) {
    var CharacterView;
    return CharacterView = (function() {
      function CharacterView(character, layer) {
        var gridPos;
        this.character = character;
        this.layer = layer;
        this.executeMove = __bind(this.executeMove, this);;
        this.updatePath = __bind(this.updatePath, this);;
        this.setPath = __bind(this.setPath, this);;
        gridPos = math.gridPosition(this.character.x, this.character.y);
        this.z = gridPos.z;
        this.x = this.accountForHeight(gridPos.x);
        this.y = this.accountForWidth(gridPos.y);
        this.path = null;
      }
      CharacterView.prototype.accountForHeight = function(x) {
        return x + (images.main.width / 2) - (images.character.width / 2);
      };
      CharacterView.prototype.accountForWidth = function(y) {
        return y - (images.character.height / 2);
      };
      CharacterView.prototype.moving = function() {
        return this.path !== null;
      };
      CharacterView.prototype.setPath = function(path) {
        this.path = path;
        return this.updatePath(0);
      };
      CharacterView.prototype.updatePath = function(index) {
        var hex, _i, _j, _len, _len2, _ref, _ref2;
        if (this.path && index >= this.path.length) {
          _ref = this.path;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            hex = _ref[_i];
            hex.select(false);
          }
          this.character.x = this.path[this.path.index].x;
          this.character.y = this.path[this.path.index].y;
          animator.removeListener(this.executeMove);
          return this.path = null;
        } else {
          this.path.index = index;
          this.path.to = math.gridPosition(this.path[index].x, this.path[index].y);
          this.path.to.x = this.accountForHeight(this.path.to.x);
          this.path.to.y = this.accountForWidth(this.path.to.y);
          this.path.dx = Math.abs(this.x - this.path.to.x);
          this.path.dy = Math.abs(this.y - this.path.to.y);
          this.path.mx = 0;
          this.path.my = 0;
          this.path.angle = Math.atan(this.path.dy / this.path.dx);
          this.path.xDirection = (this.path.to.x > this.x ? 1 : -1);
          this.path.yDirection = (this.path.to.y > this.y ? 1 : -1);
          if (index === 0) {
            _ref2 = this.path;
            for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
              hex = _ref2[_j];
              hex.select(true);
            }
            return animator.addListener(this.executeMove);
          }
        }
      };
      CharacterView.prototype.executeMove = function() {
        var mx, my;
        mx = Math.cos(this.path.angle) * constants.characterSpeed;
        my = Math.sin(this.path.angle) * constants.characterSpeed;
        this.path.mx = this.path.mx + mx;
        this.path.my = this.path.my + my;
        this.x = Math.round(this.x + (mx * this.path.xDirection));
        this.y = Math.round(this.y + (my * this.path.yDirection));
        if (this.path.mx >= this.path.dx || this.path.my > this.path.dy) {
          this.path[this.path.index].select(false);
          this.updatePath(this.path.index + 1);
        }
        return this.layer.redraw();
      };
      CharacterView.prototype.draw = function(context) {
        return context.drawImage(images.character, this.x, this.y, images.character.width, images.character.height);
      };
      return CharacterView;
    })();
  });
}).call(this);
