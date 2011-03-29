# class which exposes the canvas as an object, adding support for layers,
# dirty regions, smarter redrawing, etc.
define ['jquery', 'log', 'constants', 'ui/LayerList', 'ui/DirtyList', 'ui/Rectangle'], ($, log, constants, LayerList, DirtyList, Rectangle) ->
  canvas            = $('#canvas')[0]
  context           = canvas.getContext('2d')
  logging           = false
  canvas.clipRegion = null
  canvas.dirty      = new DirtyList()
  canvas.layers     = new LayerList()
  canvas.bounds     = new Rectangle(0, 0, canvas.width, canvas.height)


  class DragState
    constructor: (event) ->
      @startDragX = deviceCoordinateX(event)
      @startDragY = deviceCoordinateY(event)
      @endDragX   = @startDragX
      @endDragY   = @startDragY
      @movementX  = 0
      @movementY  = 0
    update: (event) =>
      initial    = !@hasMoved
      @movementX = deviceCoordinateX(event) - @endDragX
      @movementY = deviceCoordinateY(event) - @endDragY
      @endDragX  = deviceCoordinateX(event)
      @endDragY  = deviceCoordinateY(event)
    hasMoved: -> (@startDragX != @endDragX) or (@startDragY != @endDragY)
    toString: -> "DragState(start: #{@startDragX}/#{@startDragY}, end: #{@endDragX}/#{@endDragY}"


  class MouseEvent
    constructor: (@wrappedEvent) ->
      @x = deviceCoordinateX(@wrappedEvent)
      @y = deviceCoordinateY(@wrappedEvent)
    toString: -> "MouseEvent(x: #{@x}, y: #{@y})"


  class MouseDraggedEvent extends MouseEvent
    constructor: (@wrappedEvent, @dragState) ->
      super(@wrappedEvent)
      @movementX = @dragState.movementX
      @movementY = @dragState.movementY
    toString: -> "MouseDraggedEvent(x: #{@x}, y: #{@y}, movement: #{@movementX}/#{@movementY})"


  deviceCoordinateX = (event) =>
    offset = (value) -> value - canvas.offsetLeft
    return offset(event.touches[0].pageX) if event.touches?.item(0)?
    return offset(dragState.endDragX) if dragState? and event.touches?
    return offset(event.pageX) if event.pageX?
    throw "unable to determine x coordate for event: #{event}"


  deviceCoordinateY = (event) =>
    offset = (value) -> value - canvas.offsetTop
    return offset(event.touches[0].pageY) if event.touches?.item(0)?
    return offset(dragState.endDragY) if dragState? and event.touches?
    return offset(event.pageY) if event.pageY?
    throw "unable to determine y coordate for event: #{event}"


  dragState             = null
  mouseMoveListeners    = []
  mouseDragListeners    = []
  mouseDragEndListeners = []
  mouseDownListeners    = []
  mouseUpListeners      = []

  canvas.addMoveListener    = (fn) -> mouseMoveListeners.push(fn)
  canvas.addDragListener    = (fn) -> mouseDragListeners.push(fn)
  canvas.addDragEndListener = (fn) -> mouseDragEndListeners.push(fn)
  canvas.addDownListener    = (fn) -> mouseDownListeners.push(fn)
  canvas.addUpListener      = (fn) -> mouseUpListeners.push(fn)

  fire = (event, listeners) -> l(event) for l in listeners

  mouseMove = (event) ->
    if dragState?
      log.debug "firing mouse dragged event" if logging
      dragState.update(event)
      fire new MouseDraggedEvent(event, dragState), mouseDragListeners
    else
      log.debug "firing mouse moved event" if logging
      fire new MouseEvent(event), mouseMoveListeners
    event.preventDefault() if event.touches

  mouseUp = (event) ->
    if dragState?.hasMoved()
      log.debug "firing draged ended event" if logging
      fire new MouseDraggedEvent(event, dragState), mouseDragEndListeners
    else
      log.debug "firing mouse up event" if logging
      fire new MouseEvent(event), mouseUpListeners
    dragState = null
    event.preventDefault() if event.touches

  mouseOut = (event) ->
    if dragState?.hasMoved()
      log.debug "firing draged ended event" if logging
      fire new MouseDraggedEvent(event, dragState), mouseDragEndListeners
    dragState = null

  mouseDown = (event) ->
    log.debug "firing mouse down event" if logging
    dragState = new DragState(event)
    fire new MouseEvent(event), mouseDownListeners
    event.preventDefault() if event.touches

  canvas[if constants.supportsTouch then 'ontouchmove' else 'onmousemove'] = mouseMove
  canvas[if constants.supportsTouch then 'ontouchend' else 'onmouseup'] = mouseUp
  canvas[if constants.supportsTouch then 'ontouchstart' else 'onmousedown'] = mouseDown
  canvas['onmouseout'] = mouseOut


  # defines the redraw method for the canvas. what redraw does is it will
  # iterate through all the layers, sub-layers, etc, and only issue redraw
  # commands to those layers, or layer parts which are in a dirty region
  # of the canvas.
  canvas.redraw = =>
    if canvas.dirty.exists()
      context.save() # stores the 'blank' context so restore below can restore it

      # begins drawing all our clipping rectangles, and clear each dirty rect that
      # we'll be redrawing.
      context.beginPath()
      canvas.dirty.each (rectangle) ->
        context.clearRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
        context.rect(rectangle.x - 0.5, rectangle.y - 0.5, rectangle.width + 1, rectangle.height + 1)
      context.closePath()

      # set's our clipping context, nothing outside of this will be drawn
      context.clip()

      # next we need to determine which layers need to be redrawn. originally we looped
      # through all the dirty rects in a loop, then all the layers and drew them. the problem
      # with this is in doing so the depth indicators in some layers get's "ignored" if two
      # seperate dirty triangles are in the same region. instead we need to ensure that we only
      # iterate through each layer once.
      redrawLayers = (layers) ->
        layers.each (layer) ->                                          # iterate over each layer in this linked list
          if layer.enabled() and layer.bounds.intersects(canvas.bounds) # is this viewable and enabled?
            canvas.dirty.each (rectangle) ->                            # iterate through all the dirty rectangles
              drawn = null                                              # stores if we've drawn this already from a previous rect.
              unless drawn?                                             # have we already drawn it due to a previous iteration?
               if layer.bounds.intersects(canvas.bounds)                # is this layer viewable?
                 if rectangle.intersects(layer.bounds)                  # is this layer a dirty bastard?
                  layer.redraw(rectangle)                               # draw the layer
                  redrawLayers(layer.layers)                            # draw the sub-layers
                  drawn = true                                          # remember we've already drawn this

      redrawLayers(canvas.layers)
      canvas.dirty.clear()

      context.restore() # re-initializes the non-clipped context

  return canvas