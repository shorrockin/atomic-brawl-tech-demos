define ['views/canvas', 'views/context', 'logging'], (mainCanvas, mainContext, log) ->
  class Layer
    constructor: (@name, @opacity, @width, @height, @z) ->
      @canvas                 = document.createElement('canvas')
      @canvas.width           = @width
      @canvas.height          = @height
      @context                = @canvas.getContext("2d")
      @offsetX                = 0
      @offsetY                = 0
      @components             = []
      @offsetChangedListeners = []
      @dirty                  = true

    addDragListener: (fn) -> mainCanvas.addDragListener fn
    addDownListener: (fn) -> mainCanvas.addDownListener fn
    addMoveListener: (fn) -> mainCanvas.addMoveListener fn
    addDragEndListener: (fn) -> mainCanvas.addDragEndListener fn
    addUpListener: (fn) -> mainCanvas.addUpListener fn
    addOffsetChangedListener: (fn) => @offsetChangedListeners.push(fn)

    updateOffsets: (x, y) =>
      @offsetX = x
      @offsetY = y
      fn(x, y) for fn in @offsetChangedListeners

    addComponent: (component) ->
      @components.push(component)
      @sort()

    sort: ->
      @components.sort (left, right) -> left.z - right.z

    redraw: ->
      @dirty = true
      mainContext.redraw()

    draw: ->
      if @dirty
        @context.clearRect(0, 0, @canvas.width, @canvas.height)
        c.draw(@context) for c in @components

      mainContext.drawImage(@canvas, @offsetX, @offsetY)
      @dirty = false
