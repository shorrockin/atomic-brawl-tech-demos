req = []
req.push 'constants'
req.push 'ui/images'
req.push 'math'
req.push 'ui/ImageLayer'
req.push 'ui/WaypointAnimation'
req.push 'ui/ConstantVelocity'


define req, (constants, images, math, ImageLayer, WaypointAnimation, ConstantVelocity) ->
  class DudeWaypoint
    constructor: (@hex, dude) ->
      to = math.gridPosition(@hex.x, @hex.y)
      @x = dude.adjustXForImage(to.x)
      @y = dude.adjustYForImage(to.y)


  # could refactor to use common components in character layer, yay for
  # tech demos.
  class DudeLayer extends ImageLayer
    constructor: (parent, id, @hexagons) ->
      super("dude_layer_#{id}", images.character, parent)
      @x = constants.dudeStart[0]
      @y = constants.dudeStart[1]
      @dimensions.set(images.character.width, images.character.height, 99999)
      @setRandomAnimation()


    setRandomAnimation: =>
      @updatePosition()

      toX = math.random(0, constants.boardWidth)
      toY = math.random(0, constants.boardHeight)

      if @hexagons[toX][toY].enabled
        path = math.path(@hexagons[@x][@y], @hexagons[toX][toY])
        if path
          @x         = @hexagons[toX][toY].x
          @y         = @hexagons[toX][toY].y
          path       = (new DudeWaypoint(p, this) for p in path)
          @animation = new WaypointAnimation(this, path, new ConstantVelocity(constants.dudeSpeed))
          @animation.addStopListener(@setRandomAnimation)
          return null

      return @setRandomAnimation()

    updatePosition: ->
      gridPosition    = math.gridPosition(@x, @y)
      gridPosition.x  = @adjustXForImage(gridPosition.x)
      gridPosition.y  = @adjustYForImage(gridPosition.y)
      @position.set(gridPosition.x, gridPosition.y)

    adjustXForImage: (value) ->
      value + (images.main.width / 2) - (images.character.width / 2)

    adjustYForImage: (value) ->
      value + (images.main.height / 2) - images.character.height

