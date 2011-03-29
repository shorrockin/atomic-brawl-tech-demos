var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(function() {
  var Graphics;
  return Graphics = (function() {
    function Graphics(mainSrc, bottomSrc, onLoad) {
      this.side = __bind(this.side, this);;
      this.radius = __bind(this.radius, this);;
      this.width = __bind(this.width, this);;
      this.height = __bind(this.height, this);;      var notify;
      this.main = new Image();
      this.bottom = new Image();
      this.mainLoaded = false;
      this.bottomLoaded = false;
      notify = __bind(function() {
        if (this.mainLoaded && this.bottomLoaded) {
          return onLoad();
        }
      }, this);
      this.main.onload = __bind(function() {
        return (this.mainLoaded = true) && notify();
      }, this);
      this.bottom.onload = __bind(function() {
        return (this.bottomLoaded = true) && notify();
      }, this);
      this.main.src = mainSrc;
      this.bottom.src = bottomSrc;
    }
    Graphics.prototype.height = function() {
      return this.main.height;
    };
    Graphics.prototype.width = function() {
      return this.main.width;
    };
    Graphics.prototype.radius = function() {
      return Math.round(this.width() / 2);
    };
    Graphics.prototype.side = function() {
      return Math.round(this.radius() * 3 / 2);
    };
    return Graphics;
  })();
});