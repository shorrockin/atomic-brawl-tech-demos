(function() {
  define([], function() {
    var Rectangle;
    return Rectangle = (function() {
      function Rectangle(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.width = Math.abs(this.x2 - this.x1);
        this.height = Math.abs(this.y2 - this.y1);
        this.x = this.x1;
        this.y = this.y1;
      }
      Rectangle.prototype.merge = function(rectangle) {
        return new Rectangle((this.x1 < rectangle.x1 ? this.x1 : rectangle.x1), (this.y1 < rectangle.y1 ? this.y1 : rectangle.y1), (this.x2 > rectangle.x2 ? this.x2 : rectangle.x2), (this.y2 > rectangle.y2 ? this.y2 : rectangle.y2));
      };
      Rectangle.prototype.contract = function(rectangle) {
        return new Rectangle((this.x1 > rectangle.x1 ? this.x1 : rectangle.x1), (this.y1 > rectangle.y1 ? this.y1 : rectangle.y1), (this.x2 < rectangle.x2 ? this.x2 : rectangle.x2), (this.y2 < rectangle.y2 ? this.y2 : rectangle.y2));
      };
      Rectangle.prototype.intersects = function(rectangle) {
        return !this.outside(rectangle);
      };
      Rectangle.prototype.outside = function(rectangle) {
        return this.x1 >= rectangle.x2 || this.x2 <= rectangle.x1 || this.y1 >= rectangle.y2 || this.y2 <= rectangle.y1;
      };
      Rectangle.prototype.contains = function(rectangle) {
        return this.hasPoint(rectangle.x1, rectangle.y1) && this.hasPoint(rectangle.x2, rectangle.y1) && this.hasPoint(rectangle.x1, rectangle.y2) && this.hasPoint(rectangle.x2, rectangle.x2);
      };
      Rectangle.prototype.hasPoint = function(x, y) {
        return this.x1 <= x && this.x2 >= x && this.y1 <= y && this.y2 >= y;
      };
      Rectangle.prototype.equals = function(rectangle) {
        return this.x1 === rectangle.x1 && this.x2 === rectangle.x2 && this.y1 === rectangle.y1 && this.y2 === rectangle.y2;
      };
      Rectangle.prototype.toString = function() {
        return "Rectangle[" + this.x1 + "/" + this.y1 + " -> " + this.x2 + "/" + this.y2 + ", width: " + this.width + ", height: " + this.height + "]";
      };
      return Rectangle;
    })();
  });
}).call(this);
