define ['views/PlantLayer', 'views/CharacterView', 'constants', 'models/images', 'math', 'logging'], (PlantLayer, CharacterView, constants, images, math, log) ->
  class CharacterLayer extends PlantLayer
    constructor: (@gridLayer, @game) ->
      super(@gridLayer, "character-layer")
      @selected  = null
      @character = new CharacterView(@game.character, this)
      @addComponent(@character)
      @addUpListener(@clicked)

    clicked: (event) =>
      coords = math.gridAtMousePosition(event.x - @offsetX, event.y - @offsetY)
      if coords?.x? and !@character.moving()
        clicked = @game.hexagons[coords.x][coords.y]

        # did they select our character?
        if clicked.x == @game.character.x and clicked.y == @game.character.y
          @selected = clicked
          @selected = null if clicked.selected # if they're unselecting
          clicked.select(!clicked.selected)

        # they've clicked somewhere - and they've selected the character prior. damn son -
        # this must be a move action!
        else if @selected and clicked.enabled
          path = math.path(@selected, clicked)
          if path
            path.push clicked # append the final destination
            @character.setPath(path)
            @selected.select(false) if @selected
            @selected = null
          else
            log.warn "no path available from #{@selected} to #{clicked}"

        # they must be toggling board elements
        else
          clicked.enable(!clicked.enabled)


