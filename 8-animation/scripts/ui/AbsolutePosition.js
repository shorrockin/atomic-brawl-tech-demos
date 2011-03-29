(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['ui/Position'], function(Position) {
    var AbsolutePosition;
    return AbsolutePosition = (function() {
      __extends(AbsolutePosition, Position);
      function AbsolutePosition(owner, parent) {
        this.owner = owner;
        this.parent = parent;
        this.toString = __bind(this.toString, this);;
        this._update = __bind(this._update, this);;
        this.clone = __bind(this.clone, this);;
        AbsolutePosition.__super__.constructor.call(this, 0, 0);
        this._update();
        this.owner.position.addChangeListener(this._update);
        if (this.parent) {
          this.parent.absPosition.addChangeListener(this._update);
        }
      }
      AbsolutePosition.prototype.set = function(mx, my, mz) {
        throw "should not call set for an absolute position";
      };
      AbsolutePosition.prototype.clone = function() {
        return new AbsolutePosition(this.owner, this.parent);
      };
      AbsolutePosition.prototype._update = function() {
        var original;
        original = {
          x: this.x,
          y: this.y
        };
        this.x = this.owner.position.x;
        this.y = this.owner.position.y;
        if (this.parent) {
          this.x = this.x + this.parent.absPosition.x;
          this.y = this.y + this.parent.absPosition.y;
        }
        return this.fireChanged({
          from: original,
          to: this
        });
      };
      AbsolutePosition.prototype.toString = function() {
        return "AbsolutePosition[x: " + this.x + ", y: " + this.y + "]";
      };
      return AbsolutePosition;
    })();
  });
}).call(this);
