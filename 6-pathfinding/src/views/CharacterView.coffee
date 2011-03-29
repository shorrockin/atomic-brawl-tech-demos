define ['constants', 'models/images', 'logging', 'math', 'animator'], (constants, images, log, math, animator) ->
  class CharacterView
    constructor: (@character, @layer) ->
      gridPos      = math.gridPosition(@character.x, @character.y)
      @z           = gridPos.z
      @x           = @accountForHeight(gridPos.x)
      @y           = @accountForWidth(gridPos.y)
      @path        = null # if we're moving the complete path

    accountForHeight: (x) -> x + (images.main.width / 2) - (images.character.width / 2)
    accountForWidth: (y) -> y - (images.character.height / 2)

    moving: -> @path != null

    setPath: (path) =>
      @path = path
      @updatePath(0)

    updatePath: (index) =>
      # we've reached our final destination
      if @path and index >= @path.length
        hex.select(false) for hex in @path
        @character.x = @path[@path.index].x
        @character.y = @path[@path.index].y
        animator.removeListener(@executeMove)
        @path = null
      # move to the next position in the path
      else
        @path.index      = index
        @path.to         = math.gridPosition(@path[index].x, @path[index].y)
        @path.to.x       = @accountForHeight(@path.to.x)
        @path.to.y       = @accountForWidth(@path.to.y)
        @path.dx         = Math.abs(@x - @path.to.x) # distance x
        @path.dy         = Math.abs(@y - @path.to.y) # distance y
        @path.mx         = 0 # moved x
        @path.my         = 0 # moved y
        @path.angle      = Math.atan(@path.dy / @path.dx) # angle to get from current position to the next point in the path
        @path.xDirection = (if @path.to.x > @x then 1 else -1)
        @path.yDirection = (if @path.to.y > @y then 1 else -1)

        # if it's our first time here, select everything, and notify
        # the animator that it can hit us up.
        if index == 0
          hex.select(true) for hex in @path
          animator.addListener(@executeMove)

    executeMove: =>
      mx       = Math.cos(@path.angle) * constants.characterSpeed
      my       = Math.sin(@path.angle) * constants.characterSpeed
      @path.mx = @path.mx + mx
      @path.my = @path.my + my
      @x       = Math.round(@x + (mx * @path.xDirection))
      @y       = Math.round(@y + (my * @path.yDirection))

      # check to see if we reached our current destination - if so then update our path
      if (@path.mx >= @path.dx or @path.my > @path.dy)
        @path[@path.index].select(false)
        @updatePath(@path.index + 1)

      @layer.redraw()

    draw: (context) ->
      context.drawImage(images.character, @x, @y, images.character.width, images.character.height)