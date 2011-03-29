(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['views/PlantLayer', 'views/CharacterView', 'constants', 'models/images', 'math', 'logging'], function(PlantLayer, CharacterView, constants, images, math, log) {
    var CharacterLayer;
    return CharacterLayer = (function() {
      __extends(CharacterLayer, PlantLayer);
      function CharacterLayer(gridLayer, game) {
        this.gridLayer = gridLayer;
        this.game = game;
        this.clicked = __bind(this.clicked, this);;
        CharacterLayer.__super__.constructor.call(this, this.gridLayer, "character-layer");
        this.selected = null;
        this.character = new CharacterView(this.game.character, this);
        this.addComponent(this.character);
        this.addUpListener(this.clicked);
      }
      CharacterLayer.prototype.clicked = function(event) {
        var clicked, coords, path;
        coords = math.gridAtMousePosition(event.x - this.offsetX, event.y - this.offsetY);
        if (((coords != null ? coords.x : void 0) != null) && !this.character.moving()) {
          clicked = this.game.hexagons[coords.x][coords.y];
          if (clicked.x === this.game.character.x && clicked.y === this.game.character.y) {
            this.selected = clicked;
            if (clicked.selected) {
              this.selected = null;
            }
            return clicked.select(!clicked.selected);
          } else if (this.selected && clicked.enabled) {
            path = math.path(this.selected, clicked);
            if (path) {
              path.push(clicked);
              this.character.setPath(path);
              if (this.selected) {
                this.selected.select(false);
              }
              return this.selected = null;
            } else {
              return log.warn("no path available from " + this.selected + " to " + clicked);
            }
          } else {
            return clicked.enable(!clicked.enabled);
          }
        }
      };
      return CharacterLayer;
    })();
  });
}).call(this);
