requirements = []
requirements.push 'log'
requirements.push 'canvas'
requirements.push 'context'
requirements.push 'constants'
requirements.push 'math'
requirements.push 'ui/LayerList'
requirements.push 'ui/Position'
requirements.push 'ui/AbsolutePosition'
requirements.push 'ui/Dimensions'
requirements.push 'ui/Rectangle'

define requirements, (log, canvas, context, constants, math, LayerList, Position, AbsolutePosition, Dimensions, Rectangle) ->
  class Layer
    # main constructor, parent may be null if this is the first
    # layer on our canvas
    constructor: (@name, @parent) ->
      @layers      = new LayerList() # all child layers
      @position    = new Position(0, 0) # relative to the parent layer
      @absPosition = new AbsolutePosition(this, @parent) # relative to the canvas

      if @parent
        @dimensions = new Dimensions(0, 0, 0)
        @parent.layers.push(this)
      else
        @dimensions = new Dimensions(canvas.width, canvas.height, 0) # defaults to canvas
        canvas.layers.push(this)

      computeBounds = =>
        @bounds = new Rectangle(@absPosition.x,
                                @absPosition.y,
                                @absPosition.x + @dimensions.width,
                                @absPosition.y + @dimensions.height)
      computeBounds()
      @absPosition.addChangeListener(computeBounds)
      @dimensions.addChangeListener(computeBounds)


      # determine if we're growing or shrinking and add a dirty rectangle for
      # the greater of the two.
      @dimensions.addChangeListener (event) =>
        width = if event.from.width > event.to.width then event.from.width else event.to.width
        height = if event.from.height > event.to.height then event.from.height else event.to.height
        canvas.dirty.push(new Rectangle(@absPosition.x, @absPosition.y, @absPosition.x + width, @absPosition.y + height))


      # when our position changes we need to add a dirty rectangle for both our
      # origin position, and our destination position.
      @absPosition.addChangeListener (event) =>
        origin = new Rectangle(event.from.x, event.from.y, event.from.x + @dimensions.width, event.from.y + @dimensions.height)
        destination = new Rectangle(event.to.x, event.to.y, event.to.x + @dimensions.width, event.to.y + @dimensions.height)
        canvas.dirty.push(origin)
        canvas.dirty.push(destination)

    addDragListener: (fn) -> canvas.addDragListener fn
    addDownListener: (fn) -> canvas.addDownListener fn
    addMoveListener: (fn) -> canvas.addMoveListener fn
    addDragEndListener: (fn) -> canvas.addDragEndListener fn
    addUpListener: (fn) -> canvas.addUpListener fn


    mousePosition: (event) ->
      math.gridAtMousePosition(event.x - @absPosition.x, event.y - @absPosition.y)


    # marks this layer as dirty, useful for when images within this layer change, note that
    # if this layer moves or resizes, that is automatically handled.
    markDirty: -> canvas.dirty.push(@bounds)


    # sub-classes can override this method to provide drawing behaviour
    redraw: (rectangle) =>


    # sub-classes can override if they want to be able to disable a layer
    enabled: -> true


    drawImage: (image, x, y, width, height) ->
      context.drawImage(image, x + @absPosition.x, y + @absPosition.y, width, height)

    beginPath: ->
      context.beginPath()

    moveTo: (x, y) ->
      context.moveTo(x + @absPosition.x, y + @absPosition.y)

    lineTo: (x, y) ->
      context.lineTo(x + @absPosition.x, y + @absPosition.y)

    fill: ->
      context.fill()

    fillStyle: (value) ->
      context.fillStyle = value

    font: (value) ->
      context.font = value

    fillText: (text, x, y) ->
      context.fillText(text, x + @absPosition.x, y + @absPosition.y)

    closePath: ->
      context.closePath()

    toString: => "Layer[name: #{@name}, position: #{@position}, absPosition: #{@absPosition}, bounds: #{@bounds}, dimensions: #{@dimensions}, parent: #{if @parent then @parent.name else 'N/A'}]"
