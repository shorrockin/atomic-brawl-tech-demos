require ["jquery", "logging", "classes/Graphics", "classes/State"], ($, log, Graphics, State) ->
  $(document).ready =>
    log.debug "loading graphic set"
    @graphics = new Graphics "images/hex_tile_top.png", "images/hex_tile_bottom.png", =>
      log.debug "graphic set loaded"

      canvas = $("#canvas")[0]
      @state = new State(canvas, 12, 11, @graphics)
      board  = @state.board
      log.debug "touch supported: #{@state.supportsTouch}"

      board.toggle(0, 0).toggle(1, 0).toggle(2, 0).toggle(0, 1)
      board.toggle(6, 0).toggle(7, 0).toggle(8, 0).toggle(9, 0).toggle(10, 0).toggle(11, 0)
      board.toggle(8, 1).toggle(9, 1).toggle(10, 1).toggle(11, 1).toggle(10, 2).toggle(11, 2)
      board.toggle(0, 8).toggle(0, 9).toggle(0, 10).toggle(1, 8).toggle(1, 9).toggle(1, 10)
      board.toggle(2, 9).toggle(2, 10).toggle(3, 9).toggle(3, 10).toggle(4, 10)
      board.toggle(5, 10).toggle(11, 9).toggle(9, 10).toggle(10, 10).toggle(11, 10)

      redrawCanvas()

      # code to display the 'hover' graphic whenever the mouse moves while not dragging, and
      # the transformation if the mouse is dragging.
      canvas[if @state.supportsTouch then 'ontouchmove' else 'onmousemove'] = mouseMove

      # code to toggle the hex grid which the user clicked on
      canvas[if @state.supportsTouch then 'ontouchend' else 'onmouseup'] = mouseUp

      # code to toggle the mouse down action which is the start of our drag event.
      canvas[if @.state.supportsTouch then 'ontouchstart' else 'onmousedown'] = mouseDown

  mouseMove = (event) =>
    if @state.dragging
      deltaX          = @state.dragging.startX - eventX(event)
      deltaY          = @state.dragging.startY - eventY(event)
      @state.offsetX  = @state.offsetX - deltaX
      @state.offsetY  = @state.offsetY - deltaY
      @state.dragging = { startX: eventX(event), startY: eventY(event), hasDragged: true }

      event.preventDefault() if event.touches
      redrawCanvas()
    else
      @state.board.enableAtPoint(eventX(event) - @state.offsetX, eventY(event) - @state.offsetY)
      redrawCanvas()

  mouseUp = (event) =>
    unless (@state.dragging and @state.dragging.hasDragged)
      @state.board.toggleAtPoint(eventX(event) - @state.offsetX, eventY(event) - @state.offsetY)
      redrawCanvas()
    @state.dragging = false

  mouseDown = (event) =>
    log.debug "mouse down detected, starting potential drag event"
    @state.dragging = { startX: eventX(event), startY: eventY(event), hasDragged: false }

  eventX = (event) ->
    out = event.pageX
    out = event.touches[0].pageX if event.touches?.item(0)?
    out = @state.dragging.startX if (event.touches? and !event.touches?.item(0))
    out

  eventY = (event) ->
    out = event.pageY
    out = event.touches[0].pageY if event.touches?.item(0)?
    out = @state.dragging.startY if (event.touches? and !event.touches?.item(0))
    out

  redrawCanvas = ->
    @state.context.clearRect(0, 0, @state.canvas.width, @state.canvas.height)
    @state.board.each (grid) => grid.draw()