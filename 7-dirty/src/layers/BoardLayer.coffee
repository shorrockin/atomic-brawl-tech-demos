define ['log', 'math', 'constants', 'ui/Layer', 'layers/HexagonLayer', 'layers/CharacterLayer'], (log, math, constants, Layer, HexagonLayer, CharacterLayer) ->
  class BoardLayer extends Layer
    constructor: (@game) ->
      super("game-board")
      @hexagons      = @game.hexagons
      @hexagonLayers = []
      @hovered       = null
      @character     = new CharacterLayer(@game.character, this)
      @dimensions.set(math.boardWidth(), math.boardHeight())

      # creates all the layers, add's them to a local variable
      for column in @hexagons
        @hexagonLayers.push(new HexagonLayer(h, this) for h in column)

      # set's up the board movement on drag
      @addDragListener (event) =>
        @position.move(Math.round(event.movementX * constants.boardMovementRate),
                       Math.round(event.movementY * constants.boardMovementRate))


      # set's up the board hover selection when the mouse moves
      @addMoveListener (event) =>
        coords = @mousePosition(event)
        over   = @hexagonLayerAt(coords.x, coords.y) if coords
        if over != @hovered                    # has the hovered over tile changed?
          over.top.markDirty() if over         # mark the new tile as dirty
          @hovered.top.markDirty() if @hovered # set the previously hovered tile as dirty
          @hovered = over                      # remember what we've selected


      @addUpListener (event) =>
        coords = @mousePosition(event)
        layer  = @hexagonLayerAt(coords.x, coords.y) if coords

        if layer and !@character.moving()
          hex = layer.hexagon

          # if they're selecting the player
          if hex.x == @game.character.x and hex.y == @game.character.y
            if hex.selected
              @selected = null
              hex.select(false)
            else
              @selected = layer
              hex.select(!hex.selected)

          # they're issing a move command
          else if @selected
            @selected.hexagon.select(false)
            @selected = null
            @character.moveTo(hex)

          # otherwise they're toggling a grid element
          else
            hex.enable(!hex.enabled)


    hexagonLayerAt: (x, y) ->
      return if x < 0 or y < 0 or x >= constants.boardWidth or y >= constants.boardHeight
      @hexagonLayers[x][y]

