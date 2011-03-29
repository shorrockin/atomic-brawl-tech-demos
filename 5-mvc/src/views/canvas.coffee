# provides a means to get a reference to our main canvas object
# exposed via requireJs. also provides some core-extensions to the
# main canvas object to make certain objects, and abstractions
# easier.
define ['jquery', 'constants', 'logging'], ($, constants, log) ->
  canvas  = $('#canvas')[0]
  context = canvas.getContext('2d')
  logging = false

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

  # used for blocking access to redraw during callbacks, as they
  # can pileup, using this if N things call redraw, we only execute
  # the redraw once the callback finishes.
  captureRedraw = (fn) ->
    originalRedraw = canvas.redraw
    shouldRedraw   = false
    canvas.redraw = ->
      shouldRedraw = true
    fn()
    originalRedraw() if shouldRedraw
    canvas.redraw = originalRedraw

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

  fire = (event, listeners) ->
    captureRedraw -> l(event) for l in listeners

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

  components = []

  canvas.add    = (component) -> (components.push(component) and @sort())
  canvas.sort   = -> components.sort (left, right) -> left.z - right.z
  canvas.redraw = ->
    context.clearRect(0, 0, canvas.width, canvas.height)
    c.draw() for c in components

  return canvas