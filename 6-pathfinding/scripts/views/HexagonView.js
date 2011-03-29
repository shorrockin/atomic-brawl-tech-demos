(function() {
  define(['constants', 'models/images', 'logging', 'math'], function(constants, images, log, math) {
    var HexagonView;
    return HexagonView = (function() {
      function HexagonView(hexagon) {
        this.hexagon = hexagon;
        this.gridPos = math.gridPosition(this.hexagon.x, this.hexagon.y);
        this.z = this.gridPos.z;
        this.x = this.gridPos.x;
        this.y = this.gridPos.y;
      }
      HexagonView.prototype.toString = function() {
        return "HexagonView(x: " + this.hexagon.x + ", y: " + this.hexagon.y + ", z: " + this.z + ")";
      };
      HexagonView.prototype.draw = function(context) {
        if (this.hexagon.enabled) {
          context.drawImage(images.main, this.x, this.y, images.main.width, images.main.height);
        }
        if (this.hexagon.enabled) {
          return context.drawImage(images.bottom, this.x, this.y + images.main.height, images.bottom.width, images.bottom.height);
        }
      };
      return HexagonView;
    })();
  });
}).call(this);
