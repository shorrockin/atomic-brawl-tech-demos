define ['views/Layer', 'views/HexagonView', 'constants', 'models/images', 'math', 'logging'], (Layer, HexagonView, constants, images, math, log) ->
  class GridLayer extends Layer
    constructor: (@hexagons) ->
      super("grid-layer", 1, math.boardWidth(), math.boardHeight(), 1)

      @views = []
      for column in hexagons
        row = (new HexagonView(hexagon) for hexagon in column)
        @views.push(row)
        @addComponent(view) for view in row
        h.addEnableListener(@redraw) for h in column

      @addDragListener (event) =>
        @updateOffsets(@offsetX + (event.movementX * 2), @offsetY + (event.movementY * 2))
        @redraw()

      # TODO - implement event delegation based on layers so we can detect if an event has
      # already been handled. once done - re-enable this.
      #@addUpListener (event) =>
      #  coords = math.gridAtMousePosition(event.x - @offsetX, event.y - @offsetY)
      #  over   = @viewAt(coords.x, coords.y)
      #  if over
      #    over.enable(!over.enabled)
      #    @redraw()

    viewAt: (x, y) =>
      return if x < 0 or y < 0 or x >= @hexagons.length or y >= @hexagons[x].length
      @views[x][y]


