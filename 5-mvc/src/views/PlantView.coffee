define ['constants', 'models/images', 'logging', 'math'], (constants, images, log, math) ->
  class PlantView
    constructor: (@gridX, @gridY, @image) ->
      @gridPos = math.gridPosition(@gridX, @gridY)
      @z       = @gridPos.z
      @x       = @gridPos.x + (images.main.width / 2) - (@image.width / 2)
      @y       = @gridPos.y

    draw: (context) ->
      context.drawImage(@image, @x, @y, @image.width, @image.height)