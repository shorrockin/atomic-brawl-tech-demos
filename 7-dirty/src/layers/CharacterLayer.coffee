define ['constants', 'log', 'math', 'animator', 'ui/images', 'ui/ImageLayer'], (constants, log, math, animator, images, ImageLayer) ->
  class CharacterLayer extends ImageLayer
    constructor: (@character, parent) ->
      super("character_layer", images.character, parent)
      @dimensions.set(images.character.width, images.character.height, 99999)
      @updatePosition()
      @path = null

    updatePosition: ->
      gridPosition    = math.gridPosition(@character.x, @character.y)
      gridPosition.x  = @adjustXForImage(gridPosition.x)
      gridPosition.y  = @adjustYForImage(gridPosition.y)
      @position.set(gridPosition.x, gridPosition.y)

    adjustXForImage: (value) ->
      value + (images.main.width / 2) - (images.character.width / 2)

    adjustYForImage: (value) ->
      value + (images.main.height / 2) - images.character.height

    moving: -> @path != null

    hexagonLayer: ->
      @parent.hexagonLayerAt(@character.x, @character.y)

    moveTo: (end) ->
      start = @hexagonLayer().hexagon
      path  = math.path(start, end)
      if path
        start.select(false)
        hex.select(true) for hex in path

        @character.x = end.x
        @character.y = end.y
        @path = path
        @updatePath(0)
        animator.addListener(@executeMove)
      else
        log.warn "unable to find path from #{start} to #{end}"


    updatePath: (index) =>
      # we've reached our final destination
      if @path and index >= @path.length
        animator.removeListener(@executeMove)
        @path = null
      # move to the next position in the path
      else
        @path.index      = index
        @path.to         = math.gridPosition(@path[index].x, @path[index].y)
        @path.to.x       = @adjustXForImage(@path.to.x)
        @path.to.y       = @adjustYForImage(@path.to.y)
        @path.dx         = Math.abs(@position.x - @path.to.x) # distance x
        @path.dy         = Math.abs(@position.y - @path.to.y) # distance y
        @path.mx         = 0 # moved x
        @path.my         = 0 # moved y

        @path.xDirection = (if @path.to.x > @position.x then 1 else -1)
        @path.yDirection = (if @path.to.y > @position.y then 1 else -1)


    executeMove: =>
      # not 100% necessary, but forcing angle recalculation helps smooth from the
      # cos and sin functions below. without this when we reach our destination
      # we'll be out of position.
      @path.angle = Math.atan(@path.dy / @path.dx)

      mx       = Math.round(Math.cos(@path.angle) * constants.characterSpeed)
      my       = Math.round(Math.sin(@path.angle) * constants.characterSpeed)
      @path.mx = @path.mx + mx
      @path.my = @path.my + my

      # check to see if we reached our current destination - if so then update our path
      if (@path.mx >= @path.dx and @path.my >= @path.dy)
        @position.set(@path.to.x, @path.to.y)
        @path[@path.index].select(false)
        @updatePath(@path.index + 1)
      else
        @position.move(mx * @path.xDirection, my * @path.yDirection)

