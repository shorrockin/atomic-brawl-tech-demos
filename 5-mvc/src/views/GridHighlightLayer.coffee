define ['views/BoundLayer', 'views/HexagonHighlightView', 'constants', 'math', 'models/images', 'logging'], (BoundLayer, HexagonHighlightView, constants, math, images, log) ->
  class GridHighlightLayer extends BoundLayer
    constructor: (@hexagons, @gridLayer) ->
      super("grid-highlights", 1, @gridLayer, 1)

      @selected = null
      @views    = []
      for column in hexagons
        row = (new HexagonHighlightView(h) for h in column)
        @views.push(row)
        @addComponent(view) for view in row

      @addMoveListener (event) =>
        coords  = math.gridAtMousePosition(event.x - @offsetX, event.y - @offsetY)
        over    = @viewAt(coords.x, coords.y)

        if over != @selected
          @selected.select(false) if @selected
          over.select(true) if over
          @selected = over
          @redraw()

    viewAt: (x, y) =>
      return if x < 0 or y < 0 or x >= @hexagons.length or y >= @hexagons[x].length
      @views[x][y]

