(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['log', 'jquery', 'math', 'constants', 'ui/Layer', 'layers/DudeLayer', 'layers/HexagonLayer', 'layers/CharacterLayer'], function(log, $, math, constants, Layer, DudeLayer, HexagonLayer, CharacterLayer) {
    var BoardLayer;
    return BoardLayer = (function() {
      __extends(BoardLayer, Layer);
      function BoardLayer(game) {
        var column, h, _i, _len, _ref;
        this.game = game;
        BoardLayer.__super__.constructor.call(this, "game-board");
        this.hexagons = this.game.hexagons;
        this.hexagonLayers = [];
        this.hovered = null;
        this.character = new CharacterLayer(this.game.character, this);
        this.dimensions.set(math.boardWidth(), math.boardHeight());
        _ref = this.hexagons;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          column = _ref[_i];
          this.hexagonLayers.push((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = column.length; _i < _len; _i++) {
              h = column[_i];
              _results.push(new HexagonLayer(h, this));
            }
            return _results;
          }).call(this));
        }
        $("#add_dude").click(__bind(function() {
          this.dudes = this.dudes || 0;
          this.dudes++;
          $("#add_dude").attr('value', "Add Dude " + (this.dudes + 1));
          return new DudeLayer(this, this.dudes, this.hexagons);
        }, this));
        this.addDragListener(__bind(function(event) {
          return this.position.move(Math.round(event.movementX * constants.boardMovementRate), Math.round(event.movementY * constants.boardMovementRate));
        }, this));
        this.addMoveListener(__bind(function(event) {
          var coords, over;
          coords = this.mousePosition(event);
          if (coords) {
            over = this.hexagonLayerAt(coords.x, coords.y);
          }
          if (over !== this.hovered) {
            if (over) {
              over.top.markDirty();
            }
            if (this.hovered) {
              this.hovered.top.markDirty();
            }
            return this.hovered = over;
          }
        }, this));
        this.addUpListener(__bind(function(event) {
          var coords, hex, layer;
          coords = this.mousePosition(event);
          if (coords) {
            layer = this.hexagonLayerAt(coords.x, coords.y);
          }
          if (layer && !this.character.moving()) {
            hex = layer.hexagon;
            if (hex.x === this.game.character.x && hex.y === this.game.character.y) {
              if (hex.selected) {
                this.selected = null;
                return hex.select(false);
              } else {
                this.selected = layer;
                return hex.select(!hex.selected);
              }
            } else if (this.selected) {
              this.selected.hexagon.select(false);
              this.selected = null;
              return this.character.moveTo(hex);
            } else {
              return hex.enable(!hex.enabled);
            }
          }
        }, this));
      }
      BoardLayer.prototype.hexagonLayerAt = function(x, y) {
        if (x < 0 || y < 0 || x >= constants.boardWidth || y >= constants.boardHeight) {
          return;
        }
        return this.hexagonLayers[x][y];
      };
      return BoardLayer;
    })();
  });
}).call(this);
