(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(["constants", "logging"], function(constants, log) {
    var Hexagon;
    return Hexagon = (function() {
      function Hexagon(x, y, game) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.enable = __bind(this.enable, this);;
        this.select = __bind(this.select, this);;
        this.highlighted = false;
        this.selected = false;
        this.enabled = true;
        this.hashKey = "hexagon_" + this.x + "_" + this.y;
        this.selectionListeners = [];
        this.enabledListeners = [];
      }
      Hexagon.prototype.addSelectionListener = function(fn) {
        return this.selectionListeners.push(fn);
      };
      Hexagon.prototype.addEnableListener = function(fn) {
        return this.enabledListeners.push(fn);
      };
      Hexagon.prototype.fire = function(listeners, event) {
        var fn, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = listeners.length; _i < _len; _i++) {
          fn = listeners[_i];
          _results.push(fn(event));
        }
        return _results;
      };
      Hexagon.prototype.select = function(value) {
        if (value !== this.selected) {
          this.selected = value;
          return this.fire(this.selectionListeners, this);
        }
      };
      Hexagon.prototype.enable = function(value) {
        if (value !== this.enabled) {
          this.enabled = value;
          return this.fire(this.enabledListeners, this);
        }
      };
      Hexagon.prototype.populateNeighbors = function() {
        this.north = this.game.hexAt(this.x, this.y - 1);
        this.northEast = this.game.hexAt(this.x + 1, this.y - (this.x % 2 === 0 ? 1 : 0));
        this.southEast = this.game.hexAt(this.x + 1, this.y + (this.x % 2));
        this.south = this.game.hexAt(this.x, this.y + 1);
        this.southWest = this.game.hexAt(this.x - 1, this.y + (this.x % 2));
        this.northWest = this.game.hexAt(this.x - 1, this.y - (this.x % 2 === 0 ? 1 : 0));
        this.neighbors = [];
        if (this.north) {
          this.neighbors.push(this.north);
        }
        if (this.northEast) {
          this.neighbors.push(this.northEast);
        }
        if (this.southEast) {
          this.neighbors.push(this.southEast);
        }
        if (this.south) {
          this.neighbors.push(this.south);
        }
        if (this.southWest) {
          this.neighbors.push(this.southWest);
        }
        if (this.northWest) {
          return this.neighbors.push(this.northWest);
        }
      };
      Hexagon.prototype.toString = function() {
        return "Hexagon(x: " + this.x + ", y: " + this.y + ", selected: " + this.selected + ", enabled: " + this.enabled + ")";
      };
      return Hexagon;
    })();
  });
}).call(this);
