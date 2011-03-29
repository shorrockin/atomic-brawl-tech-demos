define ['views/BoundLayer', 'views/HexagonHighlightView', 'constants', 'math', 'models/images', 'logging'], (BoundLayer, HexagonHighlightView, constants, math, images, log) ->
  class GridHighlightLayer extends BoundLayer
    constructor: (@hexagons, @gridLayer) ->
      super("grid-highlights", 1, @gridLayer, 1)

      @highlighted = null
      for column in hexagons
        for hexagon in column
          view = new HexagonHighlightView(hexagon)
          hexagon.addSelectionListener(@redraw)
          hexagon.addHighlightListener(@redraw)
          @addComponent(view)

      @addMoveListener(@onMove)

    onMove: (event) =>
      coords = math.gridAtMousePosition(event.x - @offsetX, event.y - @offsetY)
      if coords
        over = @hexagons[coords.x][coords.y]

        if over != @highlighted
          @highlighted.highlight(false) if @highlighted
          over.highlight(true) if over
          @highlighted = over
      else if @highlighted
        @highlighted.highlight(false) if @highlighted
        @highlighted = null

