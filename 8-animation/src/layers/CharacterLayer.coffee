define ['constants', 'log', 'math', 'animator', 'ui/images', 'ui/ImageLayer', 'ui/WaypointAnimation', 'ui/ConstantVelocity'], (constants, log, math, animator, images, ImageLayer, WaypointAnimation, ConstantVelocity) ->

  class CharacterWaypoint
    constructor: (@hex, character) ->
      to = math.gridPosition(@hex.x, @hex.y)
      @x = character.adjustXForImage(to.x)
      @y = character.adjustYForImage(to.y)
    reached: => @hex.select(false)


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

        # character position get's updated immediately.
        @character.x = end.x
        @character.y = end.y

        # compose on arary of waypoints to pass to the animation.
        path = (new CharacterWaypoint(p, this) for p in path)
        new WaypointAnimation(this, path, new ConstantVelocity(constants.characterSpeed))

