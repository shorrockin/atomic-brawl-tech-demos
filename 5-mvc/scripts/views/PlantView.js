(function() {
  define(['constants', 'models/images', 'logging', 'math'], function(constants, images, log, math) {
    var PlantView;
    return PlantView = (function() {
      function PlantView(gridX, gridY, image) {
        this.gridX = gridX;
        this.gridY = gridY;
        this.image = image;
        this.gridPos = math.gridPosition(this.gridX, this.gridY);
        this.z = this.gridPos.z;
        this.x = this.gridPos.x + (images.main.width / 2) - (this.image.width / 2);
        this.y = this.gridPos.y;
      }
      PlantView.prototype.draw = function(context) {
        return context.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
      };
      return PlantView;
    })();
  });
}).call(this);
