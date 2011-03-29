define ['constants', 'models/images', 'logging', 'math'], (constants, images, log, math) ->
  class HexagonView
    constructor: (@hexagon) ->
      @enabled  = true
      @gridPos  = math.gridPosition(@hexagon.x, @hexagon.y)
      @z        = @gridPos.z
      @x        = @gridPos.x
      @y        = @gridPos.y

    enable: (value) -> @enabled = value

    toString: -> "HexagonView(x: #{@hexagon.x}, y: #{@hexagon.y}, z: #{@z})"

    draw: (context) ->
      context.drawImage(images.main, @x, @y, images.main.width, images.main.height) if @enabled
      context.drawImage(images.bottom, @x, @y + images.main.height, images.bottom.width, images.bottom.height) if @enabled