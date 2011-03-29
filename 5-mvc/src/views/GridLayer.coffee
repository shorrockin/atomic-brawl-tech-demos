define ['views/Layer', 'views/HexagonView', 'constants', 'models/images', 'math', 'logging'], (Layer, HexagonView, constants, images, math, log) ->
  class GridLayer extends Layer
    constructor: (@hexagons) ->
      super("grid-layer", 1, math.boardWidth(), math.boardHeight(), 1)

      @views = []
      for column in hexagons
        row = (new HexagonView(hexagon) for hexagon in column)
        @views.push(row)
        @addComponent(view) for view in row

      @viewAt(x[0], x[1]).enable(false) for x in constants.disableGrids

      @addDragListener (event) =>
        @updateOffsets(@offsetX + (event.movementX * 2), @offsetY + (event.movementY * 2))
        @redraw()

      @addUpListener (event) =>
        coords = math.gridAtMousePosition(event.x - @offsetX, event.y - @offsetY)
        over   = @viewAt(coords.x, coords.y)
        if over
          over.enable(!over.enabled)
          @redraw()

    viewAt: (x, y) =>
      return if x < 0 or y < 0 or x >= @hexagons.length or y >= @hexagons[x].length
      @views[x][y]


